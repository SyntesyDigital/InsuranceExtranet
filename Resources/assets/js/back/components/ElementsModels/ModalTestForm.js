import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import CollapsableGroup from '../Layout/CollapsableGroup';
import InputFieldJsonEdit from '../Layout/Fields/InputFieldJsonEdit';
import { connect } from 'react-redux';

import {
    closeTest
} from './actions';

let jp = require('jsonpath');

class ModalTestForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            services : []
        };

    }

    /**
     * 
     * Process all procedure fields to obtain result json.
     * 
     * @param {*} fields 
     * @param {*} json 
     * 
     */
    updateJSONWithFields(root,fields,json) {

        for(var key in fields){
            var jsonpath = root;
            var field = fields[key];

            if(field.jsonpath != null && field.jsonpath != ''){
                jsonpath += field.jsonpath;
            }
            jsonpath += field.identifier;

            console.log("updateJSONWithFields :: processing field (json,jsonpath,field)",
                JSON.parse(JSON.stringify(json)),
                jsonpath,
                field
            );

            try {
                jp.apply(json, jsonpath, function(value) { 
                    return field.example 
                });
            }
            catch(error) {
                console.error(error);
            }

            console.log("updateJSONWithFields :: result after process (json)",
                JSON.parse(JSON.stringify(json)),
            );
        }
        return json;
    }


    updateJSONFromArray(jsonpath,fields,fulljson,json) {

        var paths = null;
        try {
            paths = jp.paths(fulljson,jsonpath);
        }
        catch(error) {
            console.error(error);
            return fulljson;
        }
        
        //console.log("updateJSONFromArray :: (paths,fulljson,json,fields)",paths,fulljson,json,fields);

        var path = paths[0];

        //compute json as usual
        var json = this.updateJSONWithFields(
            '$.',
            fields,
            json
        );

        //console.log("updateJSONFromArray :: after process (path,length, fulljson,json)",path,path.length,fulljson,json);

        this.updateJSONFromPath(path,0,fulljson,json);

        //console.log("updateJSONFromArray :: result (fulljson)",fulljson);

        return fulljson;
    }

    /**
     * 
     * Iterate the json recursively until find the position where to add the array json.
     * 
     * @param {*} path array with the path to arrive to 
     * @param {*} index current index of the json
     * @param {*} variable current object form this point of array
     * @param {*} json json to add to array
     */
    updateJSONFromPath(path,index,variable,json) {

        //console.log("updateJSONFromPath :: (path,index,variable)",path,path.length,index,variable);

        if(index == path.length - 1){
            
            //if array is defined
            if(!Array.isArray(variable)){
                variable = [];
            }

            variable.push(json);
        }
        else {
            //go ahead next step
            index++;
            this.updateJSONFromPath(
                    path,index,variable[path[index]],json
                );
        }
    }

    computeServices() {

        //test 
        var services = {};
        var procedures = this.props.form.form.procedures;

        console.log("updateJSONWithFields :: Start modal test (procedures)",procedures);
        
        for(var key in procedures){

            var procedure = procedures[key];

            console.log("updateJSONWithFields :: Start procedure (order,procedure) ",procedure.order, procedure);

            var service = procedure.service;
            if(service.json == null || service.json == ''){
                console.error("Service json not found (service)",service);
                continue;
            }
            var json = JSON.parse(service.json);

            //if service not yet added 
            if(services[service.id] === undefined){
               services[service.id] = JSON.parse(JSON.stringify(service));
               services[service.id].order = procedure.order;
            }
            else {
                //get json from stored in services
                json = services[service.id].json;
            }

            //if simple procedure, no repeatable
            if(procedure.repeatable == '0'){
                
                //update json with fields
                services[service.id].json = this.updateJSONWithFields(
                    procedure.repeatable_jsonpath,
                    procedure.fields,
                    json
                );
            }
            else if(procedure.repeatable == '1' && procedure.repeatable_jsonpath == '$.[]'){
                //it is repeatable but it is array of services $.[]
                services[service.id].json = this.updateJSONWithFields(
                    '$.',   //test as normal service
                    procedure.fields,
                    json
                );

            }
            else if(procedure.repeatable == '1' && procedure.repeatable_json != '' 
                && procedure.repeatable_json != null ){
                
                //add json to array

                if(procedure.repeatable_json == null || procedure.repeatable_json == ''){
                    console.error("Procedure json not defined (procedure)",procedure);
                    continue;
                }

                services[service.id].json = this.updateJSONFromArray(
                    procedure.repeatable_jsonpath,
                    procedure.fields,
                    json,
                    JSON.parse(procedure.repeatable_json)    
                );

            }
        }

        console.log("updateJSONWithFields :: Finish procedures (services) ",services);

        var result = [];
        for(var key in services) {
            result.push(services[key]);
        }

        result.sort((a, b) => {
            return parseInt(a.order) - parseInt(b.order);
        });

        console.log("updateJSONWithFields :: (result) ",result);

        this.setState({
            services : result
        });

    }

    componentDidUpdate(prevProps,prevState) {

        if(!prevProps.display && this.props.display) {

            this.computeServices();
            
        }
    }

    renderServices() {
        return this.state.services.map((item,index) => 
            <CollapsableGroup
                identifier={item.identifier}
                title={item.http_method+' / '+item.url+' -> '+item.response}
            >
                <InputFieldJsonEdit 
                    label={'JSON'} 
                    name={item.identifier}
                    placeholder={item.json}
                    height={400}
                />

            </CollapsableGroup>
        )
    }

    render() {

        return (

            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={this.props.title}
                display={this.props.display}
                zIndex={10000}
                onModalClose={this.props.closeTest}
                size={this.props.size}
                deleteButton={false}
                submitButton={false}
            >
                <div className="row page-content form-fields">
                    {this.renderServices()}
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        form: state.form
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeTest: () => {
            return dispatch(closeTest());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalTestForm);

ModalTestForm.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,

    onModalClose: PropTypes.func
};


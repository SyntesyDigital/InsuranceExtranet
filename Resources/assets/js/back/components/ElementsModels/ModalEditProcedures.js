import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';
import SelectField from '../Layout/Fields/SelectField';
import ToggleField from '../Layout/Fields/ToggleField';
import InputFieldJsonEdit from '../Layout/Fields/InputFieldJsonEdit';
import FieldList from '../Layout/FieldList';
import FieldListItem from '../Layout/FieldListItem';
import BoxAddLarge from '../Layout/BoxAddLarge';
import ModalEditObject from './ModalEditObject';
import { connect } from 'react-redux';

import {
    closeModalProcedure,
    saveProcedure,
    removeProcedure,
    updateProcedureField,
    openModalEditObject,
    openModalCreateObject,
    removeProcedureObject,
    updateSettings

} from './actions';

import api from '../../api/index.js';


class ModalEditProcedures extends Component {

    constructor(props) {

        super(props);

        this.state = {
            services: [
                {
                    name: 'chargement...',
                    value: ''
                }
            ],
            procedure : null
        };

        this.handleChangeRepeatable = this.handleChangeRepeatable.bind(this);

    }

    componentDidMount() {
        this.loadServices();
    }

    loadServices() {
        var _this = this;
        api.services.getAll()
            .then(function(data){
                //console.log("loadServices (data)",data);

                var services = data.data.services.map((item) => {
                    return {
                        name : item.name,
                        value : item.id
                    }
                });
                services.unshift({
                    name : '---',
                    value : ''
                });

                _this.setState({
                    services : services
                })
            });
    }

    componentDidUpdate(prevProps,prevState) {
        if(!prevProps.display && this.props.display) {
            //modal is showing 
            this.setState({
                procedure : this.props.procedure
            });
        }
    }

    // ==============================
    // Handlers
    // ==============================

    handleRemoveObject(procedure, object){
        console.log("handleRemoveObject", procedure, object);
        this.props.removeProcedureObject(
            this.props.form.form.procedures,
            procedure, 
            object
        );
        //this.props.cancel
    }

    handleEditObject(procedure, object){

        //make a copy of the object
        object = JSON.parse(JSON.stringify(object));

        console.log("handleEditObject", procedure, object);
        this.props.openModalEditObject(procedure, object);
    }
    
    handleModalCloseEditObject() {
        this.setState({
            displayEditObject: false,
            displayEditProcedures: true,
        });
    }
    
    handleCreateProcedureObject(){
        console.log("handleCreateProcedureObject");

        this.props.openModalCreateObject();
    }

    handleChangeRepeatable() {
        this.setState({
            checkedRepeatable: !this.state.checkedRepeatable
        })
    }

    handleFieldChange(name, value){
        const {procedure} = this.state;
        procedure[name] = value;
        this.setState({
            procedure : procedure
        });
    }

    handleSubmit() {
        //this.props.saveGroup(this.state);
        this.props.saveProcedure(
            this.props.form.form.id,
            this.props.form.form.procedures,
            this.state.procedure
        );
    }

    handleCancel() {
        this.props.closeModalProcedure();
    }

    handleRemove() {

        this.props.removeProcedure(
            this.props.form.form.procedures,
            this.state.procedure
        );
        this.props.closeModalProcedure();
    }

    handleServiceChange(name,value) {

        var service = null;
        for(var key in this.state.services){
            if(this.state.services[key].value == value){
                service = this.state.services[key];
                //set id, beacause it's needed to graphql
                service.id = value;
            }
        }

        const {procedure} = this.state;
        procedure[name] = service;
        this.setState({
            procedure : procedure
        });
    }

    // ==============================
    // Renderers
    // ==============================

    getProcedureIndex(procedures,procedure){
        for(var key in procedures){
            if(procedures[key].id == procedure.id){
                return key;
            }
        }
        return null;
    }

    renderObjects() {

        var procedures = this.props.form.form.procedures;
        var index = this.getProcedureIndex(procedures,this.state.procedure);
        
        if (index == null)
            return null;

        var currentProcedure = procedures[index];

        console.log("renderObjects :: (currentProcedure)",currentProcedure);

        const displayObjects = currentProcedure.fields.map((object, index) =>
            <div key={object.identifier + index} className={object.identifier + index}>
                <FieldListItem
                    key={index}
                    identifier={object.identifier}
                    index={index}
                    icon={object.format !== undefined ? MODELS_FIELDS[object.format].icon : ''}
                    label={object.format !== undefined ? MODELS_FIELDS[object.format].label : ''}
                    labelField={object.name}
                    isField={true}
                    onEdit={this.handleEditObject.bind(this, currentProcedure, object)}
                    onRemove={this.handleRemoveObject.bind(this, currentProcedure, object)}
                />
            </div>
        )
        return (
            <div>
                {displayObjects}
            </div>

        )

    }

    render() {

        const currentProcedure = this.state.procedure;
        const saved = currentProcedure != null ? currentProcedure.id != null : false;

        return (

            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={'Edit Procedures'}
                display={this.props.display}
                zIndex={10000}
                size={this.props.size}
                onModalClose={this.props.closeModalProcedure}
                onCancel={this.props.closeModalProcedure}
                deleteButton={saved ? true : false}
                onSubmit={this.handleSubmit.bind(this)}
                onRemove={this.handleRemove.bind(this)}
                
            >

                <ModalEditObject
                    id={'modal-edit-object'}
                    icon={'fas fa-bars'}
                    size={'medium'}
                    title={'Object | Configuration'}
                    display={this.props.form.displayEditObject}
                    object={this.props.form.currentObject}
                    zIndex={10000}
                    onModalClose={this.handleModalCloseEditObject.bind(this)}
                />


                {currentProcedure != null &&

                    <div className="row rightbar-page">

                        <div className="col-md-8 col-xs-12 field-col page-content form-fields" style={{
                            opacity : saved ? 1 : 0.5,
                            pointerEvents : saved ? 'auto' : 'none'
                        }}>

                            <FieldList>

                                {this.renderObjects()}

                                <BoxAddLarge
                                    identifier='1'
                                    title='Ajouter'
                                    onClick={this.handleCreateProcedureObject.bind(this)}
                                />

                            </FieldList>

                        </div>

                        <div className="col-md-4 col-xs-12 field-col">

                            <InputField
                                label={'Name'}
                                name={'name'}
                                value={currentProcedure.name}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                     
                            <SelectField
                                label={'Service'}
                                value={currentProcedure.service.id}
                                name={'service'}
                                arrayOfOptions={this.state.services}
                                onChange={this.handleServiceChange.bind(this)}
                                // onChange={this.handleFieldChange.bind(this)}
                            />
                            
                            <InputField
                                label={'Ordre'}
                                name={'order'}
                                value={currentProcedure.order}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'JSON Path'}
                                name={'repeatable_jsonpath'}
                                value={currentProcedure.repeatable_jsonpath}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Configurable'}
                                name={'configurable'}
                                checked={currentProcedure.configurable == "1" ? true : false}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Required'}
                                name={'required'}
                                checked={currentProcedure.required == "1" ? true : false}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Repeatable'}
                                name={'repeatable'}
                                checked={currentProcedure.repeatable == "1" ? true : false}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            {currentProcedure.repeatable && 

                                <InputFieldJsonEdit 
                                    label={'JSON'} 
                                    name={'repeatable_json'}
                                    value={currentProcedure.repeatable_json}
                                    onChange={this.handleFieldChange.bind(this)}
                                /> 
                            }

                            

                        </div>
                    </div>

                }

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

        saveProcedure: (modelId,procedures,procedure) => {
            return dispatch(saveProcedure(modelId,procedures,procedure));
        },

        //remove
        removeProcedure: (procedures,procedure) => {
            return dispatch(removeProcedure(procedures,procedure));
        },
        //move
        moveProcedure: () => {
            return dispatch(moveProcedure());
        },

        removeProcedureObject: (procedures, procedure, object) => {
            return dispatch(removeProcedureObject(procedures, procedure, object));
        },
    
        closeModalProcedure: () => {
            return dispatch(closeModalProcedure());
        },

        openModalEditObject: (procedure, object) => {
            return dispatch(openModalEditObject(procedure, object));
        },

        openModalCreateObject: () => {
            return dispatch(openModalCreateObject());
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProcedures);

ModalEditProcedures.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,

    onAddProcedureObject: PropTypes.func,
    onEditProcedureObject: PropTypes.func,
    // onRemoveProcedureObject: PropTypes.func,
    onMoveProcedureObject: PropTypes.func,
    // onUpdateProcedureField: PropTypes.func,
    onCloseModal: PropTypes.func,

    onCancel: PropTypes.func,
    onRemove: PropTypes.func
};


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Layout/Modal';
import InputField from '../../Layout/Fields/InputField';
import SelectField from '../../Layout/Fields/SelectField';
import ToggleField from '../../Layout/Fields/ToggleField';
import InputFieldJsonEdit from '../../Layout/Fields/InputFieldJsonEdit';
import FieldList from '../../Layout/FieldList';
import FieldListItem from '../../Layout/FieldListItem';
import BoxAddLarge from '../../Layout/BoxAddLarge';
import { connect } from 'react-redux';
import api from '../../../api/index.js';

import {
    closeModalProcedure,
    saveProcedure,
    removeProcedure,
    updateProcedureField,
    openModalEditObject,
    openModalCreateObject,
    removeProcedureObject,
    updateSettings,
    importFieldsFromService,
    deleteAllFields
} from '../actions';
import ButtonSecondary from '../../Layout/ButtonSecondary';



class ModalProcedures extends Component {

    constructor(props) {
        super(props);

        this.state = {
            services: [
                {
                    name: 'chargement...',
                    value: ''
                }
            ],
            procedure : null,
            subJsonEnabled : false,
            json : {}
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
                var services = data.data.services.map((item) => {
                    return {
                        name : item.name + ' - ' + item.created_at + '',
                        value : item.id
                    }
                }).sort(function(a, b){
                    if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                    if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                    return 0;
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
            const jsonValue = this.props.procedure.repeatable_json;
            const jsonEnabled = jsonValue !== undefined && jsonValue != '' && jsonValue != null ? true : false;

            this.setState({
                procedure : this.props.procedure,
                subJsonEnabled : jsonEnabled,
                json : jsonEnabled ? JSON.parse(jsonValue) : {}
            });
        }
    }

    // ==============================
    // Handlers
    // ==============================
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

    handleImportFields() {
        const currentProcedure = this.state.procedure;

        /* TO FINISH
        this.props.deleteAllFields(
            this.props.form.form.procedures,
            currentProcedure
        );
         */
        
        this.props.importFieldsFromService(
            this.props.form.form.procedures,
            currentProcedure
        );
        

        return null;
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

    // FIXME : REDUX STATE ?
    getTypeIcon(type) {
        switch(type) {
            case "INPUT" : 
                return 'far fa-user'
            case "SYSTEM" : 
                return 'fas fa-database'
            case "CTE" : 
                return 'fas fa-lock'
        }
        return '';
    }

    renderObjects() {

        var procedures = this.props.form.form.procedures;
        var index = this.getProcedureIndex(procedures,this.state.procedure);
        
        if (index == null) {
            return null;
        }

        var currentProcedure = procedures[index];
        //var currentProcedure = this.props.form.currentProcedure;
        // if(currentProcedure == null) {
        //     return null;
        // }

        const displayObjects = currentProcedure.fields.map((object, index) => {

            var jsonpath = this.state.subJsonEnabled
                ? '[subJSON] $.'+ (object.jsonpath != null ? object.jsonpath : '') + object.identifier 
                : currentProcedure.repeatable_jsonpath + (object.jsonpath != null ? object.jsonpath : '') + object.identifier;

            //if format is not defined is considered as text. Constant and variables system 
            var format = object.format !== undefined && MODELS_FIELDS[object.format] !== undefined ? 
                object.format : 'text';

            return (
                <div 
                    key={object.identifier + index} 
                    className={object.identifier + index}
                > 
                    <FieldListItem
                        key={index}
                        identifier={object.identifier}
                        index={index}
                        icon={MODELS_FIELDS[format].icon}
                        icons={[this.getTypeIcon(object.type)]}
                        label={MODELS_FIELDS[format].label}
                        labelField={object.name + ' ( '+jsonpath+' ) '}
                        isField={true}
                        onEdit={() => this.props.openModalEditObject(currentProcedure, JSON.parse(JSON.stringify(object)))}
                        onRemove={() => this.props.removeProcedureObject(this.props.form.form.procedures,currentProcedure, object)}
                    />
                </div>
            );

        });
            
        return (
            <div>
                {displayObjects}
            </div>
        )
    }

    isForm() {
        return this.props.form.form.type == "form-v2";
    }

    render() {

        const currentProcedure = this.state.procedure;
        const saved = currentProcedure != null ? currentProcedure.id != null : false;
        const serviceUrl = currentProcedure != null && currentProcedure.service != ''   
            ? routes['extranet.services.update'].replace(':id',currentProcedure.service.id)
            : null;

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
                onSubmit={() => {
                    this.props.saveProcedure(
                        this.props.form.form.id,
                        this.props.form.form.procedures,
                        this.props.form.currentProcedure
                    );
                }}
                onRemove={() => {
                    this.props.removeProcedure(
                        this.props.form.form.procedures,
                        this.state.procedure
                    );
                    this.props.closeModalProcedure()
                }}
            >

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
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.openModalCreateObject();
                                    }}
                                />
                            </FieldList>
                        </div>

                        <div className="col-md-4 col-xs-12 field-col">

                            <SelectField
                                label={serviceUrl != null 
                                    ? <a href={serviceUrl} target="_blank"><i className="fas fa-external-link-alt"></i>&nbsp; Service</a>
                                    : 'Service'
                                }
                                value={currentProcedure.service.id !== undefined 
                                    ? currentProcedure.service.id 
                                    : ''}
                                name={'service'}
                                arrayOfOptions={this.state.services}
                                onChange={this.handleServiceChange.bind(this)}
                                // onChange={this.handleFieldChange.bind(this)}
                            />

                            {!this.isForm() && 
                                <div  style={{
                                    opacity : saved ? 1 : 0.5,
                                    pointerEvents : saved ? 'auto' : 'none'
                                }}>
                                    <ButtonSecondary 
                                        label="Importer les champs"
                                        icon="fas fa-download"
                                        onClick={this.handleImportFields.bind(this)}
                                    />
                                </div>
                            }

                            <hr/>

                            <InputField
                                label={'Name'}
                                name={'name'}
                                value={currentProcedure.name}
                                onChange={this.handleFieldChange.bind(this)}
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

                            {this.isForm() && 
                                <div>
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

                                    <ToggleField
                                        label={'précharge (PUT ou POST dupliquer)'}
                                        name={'preload'}
                                        checked={currentProcedure.preload == "1" ? true : false}
                                        onChange={this.handleFieldChange.bind(this)}
                                    />

                                    <ToggleField
                                        label={'Concaténer avec l\'ID de service'}
                                        name={'prefixed'}
                                        checked={currentProcedure.prefixed == "1" ? true : false}
                                        onChange={this.handleFieldChange.bind(this)}
                                    />

                                    <ToggleField
                                        label={'Dupliquer (POST uniquement'}
                                        name={'duplicate'}
                                        checked={currentProcedure.duplicate == "1" ? true : false}
                                        onChange={this.handleFieldChange.bind(this)}
                                    />

                                    <ToggleField
                                        label={'Sub JSON'}
                                        name={'sub_json'}
                                        checked={this.state.subJsonEnabled}
                                        onChange={(name,value) => this.setState({
                                            subJsonEnabled : value
                                        })}
                                    />
                                </div>
                            }

                            {this.state.subJsonEnabled && 
                                <InputFieldJsonEdit 
                                    label={'JSON'} 
                                    name={'repeatable_json'}
                                    placeholder={this.state.json}
                                    onChange={this.handleFieldChange.bind(this)}
                                    height={200}
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

        importFieldsFromService: (procedures,procedure) => {
            return dispatch(importFieldsFromService(procedures,procedure));
        },

        deleteAllFields: (procedures, procedure) => {
            return dispatch(deleteAllFields(procedures,procedure));
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalProcedures);

ModalProcedures.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,

    onAddProcedureObject: PropTypes.func,
    onEditProcedureObject: PropTypes.func,
    onMoveProcedureObject: PropTypes.func,
    onCloseModal: PropTypes.func,

    onCancel: PropTypes.func,
    onRemove: PropTypes.func
};


import React, { Component } from 'react';
import ButtonPrimary from '../Layout/ButtonPrimary';
import BarTitle from '../Layout/BarTitle';
import ButtonSecondary from '../Layout/ButtonSecondary';
import ButtonDropdown from '../Layout/ButtonDropdown';
import FieldList from '../Layout/FieldList';
import FieldListItem from '../Layout/FieldListItem';
import InputField from '../Layout/Fields/InputField';
import SelectField from '../Layout/Fields/SelectField';
import BoxAddLarge from '../Layout/BoxAddLarge';
import IconField from '../Layout/Fields/IconField';
import { connect } from 'react-redux';
import api from '../../api/index.js';
import ModalTestForm from './modals/ModalTestForm';
import ModalEditProcedures from './modals/ModalEditProcedures';
import ModalEditObject from './modals/ModalEditObject';
import ModalTableField from './modals/ModalTableField';

import {
    initState,

    // Form
    saveForm,
    removeForm,
    testForm,
    updateField,

    // Procedure
    removeProcedure,
    openModalCreateProcedure,
    openModalEditProcedure,

    // Object
    openModalEditObject,
    // openModalCreateObject,
    removeProcedureObject,

    // Table 
    openModalTableField,
    closeModalTableField,
    importFieldsFromService
} from './actions';


class ElementsModelsFormRedux extends Component {

    constructor(props) {

        super(props);

        this.state = {
            services: [
                {
                    name: 'chargement...',
                    value: ''
                }
            ]
        };

        this.props.initState(this.props.modelId, this.props.type);       
    }

    componentDidMount() {
        this.loadServices();
    }

    // ==============================
    // Loaders
    // ==============================
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

    // ==============================
    // Handlers
    // ==============================

    // FIELDS
    handleRemoveObject(procedure, object){
        this.props.removeProcedureObject(
            this.props.form.form.procedures,
            procedure, 
            object
        );
    }

    handleEditObject(procedure, object){
        this.props.openModalEditObject(procedure, JSON.parse(JSON.stringify(object)));
    }
    //
    
    handleEditProcedure(procedure){
        console.log("handleEditProcedure", procedure);

        //clone the object not send the reference
        procedure = JSON.parse(JSON.stringify(procedure));

        this.props.openModalEditProcedure(procedure);
    }

    handleModalCloseEditObject() {
        this.setState({
            displayEditObject: false,
            displayEditProcedures: true,
        });
    }


    handleCreateProcedure(){
        console.log("handleCreateProcedure");
        this.props.openModalCreateProcedure(this.props.form.form.procedures);
    }

    // handleCreateProcedureObject(){
    //     this.props.openModalCreateObject();
    // }

    handleRemoveProcedure(procedure){
        console.log("handleRemoveProcedure");
        this.props.removeProcedure(
            this.props.form.form.procedures, 
            procedure
        );
    }

    handleTestForm(form){
        console.log("handleTestForm");
        this.props.testForm(form);
    }

    handleRemoveForm(form) {

        var _this = this;

        bootbox.confirm({
            message: this.props.rempoveMessage !== undefined ? 
            this.props.rempoveMessage : Lang.get('fields.delete_row_alert'),
            buttons: {
                confirm: {
                    label: Lang.get('fields.si') ,
                    className: 'btn-primary'
                },
                cancel: {
                    label:  Lang.get('fields.no'),
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if(result){
                    console.log("handleRemoveForm");
                    _this.props.removeForm(_this.props.form.form);
                }
              }
            });
    }

    handleServiceChange(name,value) {

        var service = null;
        for(var key in this.state.services){
            if(this.state.services[key].value == value){
                service = this.state.services[key];
                service.id = value;
            }
        }

        const {procedure} = this.state;
        procedure[name] = service;
        this.setState({
            procedure : procedure
        });
    }

    handleSubmit() {
        console.log("handleSubmit");
        this.props.saveForm(this.props.form.form);
    }

    handleImportFromV1() {
        var _this = this;
        axios.get(routes['extranet.elements.get_by_type'])
            .then(function(response) {
                if(response.status == 200 && response.data !== undefined){

                    bootbox.prompt({
                        title: 'Importer',
                        inputType: 'select',
                        closeButton : false,
                        buttons: {
                            confirm: {
                                label: 'Envoyer',
                                className: 'btn-primary'
                            },
                            cancel : {
                                label: 'Retour',
                                className: 'btn-default'
                            }
                        },
                        inputOptions: response.data.map((item) => {
                            return {
                                text : item.TITRE,
                                value : item.ID
                            }
                        }),
                        callback: function (result) {
                          if(result != null && result != ''){
                              //api and redirect
                              _this.importModel(result);
                          }
                        }
                    });
                  }
            });

    }

    importModel(modelId) {
        axios.get(routes['extranet.element.import'].replace(':model_id',modelId))
            .then(function(response) {
                //console.log("importModel response",response.data.model.id);
                window.location.href = routes['extranet.elements-models.forms.update'].replace(':id',response.data.model.id);
            })
            .catch(function (error) {
                toastr.error(error.response.data.message);
            });
    }
    

    // ==============================
    // Getters
    // ==============================
    getFormType() {
        return this.props.form.form.type !== undefined 
            ? this.props.form.form.type
            : null;
    }

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


    // ==============================
    // Renderers
    // ==============================
    renderFields() {
        let procedure = this.props.form.form.procedures[0] !== undefined 
                ? this.props.form.form.procedures[0]
                : null;

        let displayObjects = procedure ? procedure.fields.map((object, index) =>
            <div key={object.identifier + index} className={object.identifier + index}>
                <FieldListItem
                    key={index}
                    identifier={object.identifier}
                    index={index}
                    icon={object.format !== undefined ? MODELS_FIELDS[object.format].icon : ''}
                    icons={[this.getTypeIcon(object.type)]}
                    label={object.format !== undefined ? MODELS_FIELDS[object.format].label : ''}
                    labelField={object.name}
                    isField={true}
                    onEdit={this.handleEditObject.bind(this, procedure, object)}
                    onRemove={this.handleRemoveObject.bind(this, procedure, object)}
                />
            </div>
        ) : null;

        return (
            <div>
                {displayObjects}
            </div>
        )
    }

    renderProcedures() {
        
        var procedures = this.props.form.form.procedures;

        procedures.sort((a, b) => {
            return parseInt(a.order) - parseInt(b.order);
        });

        const displayProcedures = this.props.form.form.procedures.map((procedure, index) =>
            <div key={procedure.name+index} className={procedure.name+index}>
                <FieldListItem
                    key={index}
                    identifier={procedure.id}
                    index={index}
                    icon={'fas fa-bars'}
                    icons={[
                        (procedure.repeatable == 1 ? 'fas fa-redo-alt': '')
                    ]}
                    labelInputLeft={procedure.name}
                    labelInputRight={procedure.service.name}
                    
                    //onEvents
                    onEdit={this.handleEditProcedure.bind(this, procedure)}
                    onRemove={this.handleRemoveProcedure.bind(this, procedure)}
                />
            </div>
        )
        return (
            <div>
                {displayProcedures}
            </div>
        )
    }

    render() {

        const saved = this.props.form.form.id == null ? false : true;


        return (
            <div className="forms-update">

                {this.getFormType() == "table" && 
                    <ModalTableField
                        id={'modal-edit-object'}
                        icon={'fas fa-bars'}
                        size={'medium'}
                        title={'Object | Configuration'}
                        object={this.props.currentObject}
                        procedure={this.props.form.form.procedures[0]}
                        zIndex={10000}
                        onModalClose={this.handleModalCloseEditObject.bind(this)}
                    />
                }

                <ModalTestForm
                    id={'modal-test-form'}
                    icon={'fas fa-bars'}
                    size={'medium'}
                    title={'Test Json'}
                    display={this.props.form.displayTestForm}
                    zIndex={10000}
                    // onModalClose={this.handleModalClose.bind(this)}
                />

                <ModalEditProcedures
                    id={'modal-edit-procedures'}
                    icon={'fas fa-bars'}
                    size={'large'}
                    title={'Test Json'}
                    display={this.props.form.displayEditProcedures}
                    procedure={this.props.form.currentProcedure}
                    zIndex={10000}
                />

               
                <BarTitle
                    icon={this.props.form.form.icon}
                    title={this.props.form.form.name}
                    backRoute={routes['extranet.elements-models.forms.index']}
                >
                    {(saved && this.getFormType() != "table") && 
                        <ButtonSecondary
                            label={'Test form'}
                            icon={'fas fa-sync-alt'}
                            onClick={this.handleTestForm.bind(this)}
                        />
                    }

                    {(saved && this.getFormType() == "table") && 
                        <ButtonSecondary
                            label={'Importer les champs'}
                            icon={'fas fa-sync-alt'}
                            onClick={e => {
                                e.preventDefault();

                                this.props.importFieldsFromService(1);
                            }}
                        />
                    }

                    

                    <ButtonDropdown
                        label={'Actions'}
                        list={[
                            {
                                label: 'Nouveau',
                                icon: 'fa fa-plus-circle',
                                route: routes['extranet.elements-models.forms.create'],

                            },
                            {
                                label: 'Importer',
                                icon: 'fas fa-clone',
                                onClick: this.handleImportFromV1.bind(this),
                            },
                            {
                                label: 'Supprimier',
                                icon: 'fas fa-trash-alt',
                                className: 'text-danger',
                                onClick: this.handleRemoveForm.bind(this),
                            }
                        ]}
                    />

                    <ButtonPrimary
                        label={'Sauvegarder'}
                        icon={'fa fa-save'}
                        onClick={this.handleSubmit.bind(this)}
                    />

                </BarTitle>

                <div className="container rightbar-page">

                    <div 
                        className="col-md-9 page-content form-fields" 
                        style={{
                            opacity : saved ? 1 : 0.5,
                            pointerEvents : saved ? 'auto' : 'none'
                        }}
                    >

                        <FieldList>

                            {this.getFormType() == "form-v2" && 
                                <div>
                                    { this.renderProcedures() }
                                    <BoxAddLarge
                                        title='Ajouter'
                                        onClick={this.handleCreateProcedure.bind(this)}
                                    />
                                </div>
                            }

                            {this.getFormType() == "table" && 
                                <div>
                                    { this.renderFields() }
                                    <BoxAddLarge
                                        title='Ajouter un champ'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.props.openModalTableField();
                                        }}
                                    />
                                </div>
                            }

                        </FieldList>

                    </div>

                    <div className="sidebar">

                        <InputField
                            label={'Name'}
                            value={this.props.form.form.name}
                            name={'name'}
                            onChange={this.props.updateField}
                        />
                        
                        <InputField
                            label={'Identifier'}
                            value={this.props.form.form.identifier}
                            name={'identifier'}
                            onChange={this.props.updateField}
                        />

                        <IconField
                            label={'Icone'}
                            name={'icon'}
                            value={this.props.form.form.icon}
                            onChange={this.props.updateField}
                        />

                        <InputField
                            label={'Description'}
                            value={this.props.form.form.description}
                            name={'description'}
                            onChange={this.props.updateField}
                        />


                        {this.getFormType() == "table" && 
                            <SelectField
                                label={'Service'}
                                value={1}
                                name={'service'}
                                arrayOfOptions={this.state.services}
                                onChange={this.handleServiceChange.bind(this)}
                                // onChange={this.handleFieldChange.bind(this)}
                            />
                        }

                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        form: state.form,
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {

    return {

        // ==============================
        // Initial State
        // ==============================

        initState: (modelId, type) => {
            return dispatch(initState(modelId, type));
        },

        // ==============================
        // Form
        // ==============================

        updateField: (name, value) => {
            return dispatch(updateField(name, value));
        },

        saveForm: (form) => {
            return dispatch(saveForm(form));
        },

        removeForm: (form) => {
            return dispatch(removeForm(form));
        },

        testForm: (form) => {
            return dispatch(testForm(form));
        },

        duplicateForm: (form) => {
            return dispatch(duplicateForm(form));
        },

        // ==============================
        // Procedures
        // ==============================

        removeProcedure:(procedures,procedure) => {
            return dispatch(removeProcedure(procedures,procedure));
        },
        
        openModalCreateProcedure: (procedures) => {
            return dispatch(openModalCreateProcedure(procedures));
        },

        openModalEditProcedure: (procedure) => {
            return dispatch(openModalEditProcedure(procedure));
        },


        // ==============================
        // Procedures FIELDS
        // ==============================

        removeProcedureObject: (procedures, procedure, object) => {
            return dispatch(removeProcedureObject(procedures, procedure, object));
        },


        // ==============================
        // TABLE 
        // ==============================
        openModalTableField: (field) => {
            return dispatch(openModalTableField(field));
        },

        closeModalTableField: () => {
            return dispatch(closeModalTableField());
        },

        importFieldsFromService: (servideId) => {
            return dispatch(importFieldsFromService(servideId));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementsModelsFormRedux);

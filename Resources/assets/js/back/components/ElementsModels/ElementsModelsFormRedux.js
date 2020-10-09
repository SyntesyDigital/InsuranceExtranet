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

// MODALS
import ModalTestForm from './modals/ModalTestForm';
import ModalObject from './modals/ModalObject';
import ModalProcedures from './modals/ModalProcedures';

import {
    initState,

    // Form
    saveForm,
    removeForm,
    testForm,
    updateField,

    // Procedure
    removeProcedure,
    openModalProcedure,
    closeModalProcedure,

    // Object
    openModalEditObject,
    openModalCreateObject,
    removeProcedureObject,

    // Table 
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
            ],
            errors: {
                identifier: null,
                name: null,
                service_id: null,
            }
        };

        this.props.initState(this.props.modelId, this.props.type);       
    }

    componentDidMount() {

        // FIXME : poner eso dentro del state redux
        let onLoaded = (data) => {

            let services = data.data.services.map((item) => {
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

            this.setState({
                services : services
            })
        };

        api.services
            .getAll()
            .then(data => onLoaded(data));
    }

    // ==============================
    // Loaders
    // ==============================


    // ==============================
    // Handlers
    // ==============================

    handleRemoveObject(procedure, object){
        this.props.removeProcedureObject(
            this.props.form.form.procedures,
            procedure, 
            object
        );
    }

    handleRemoveProcedure(procedure){
        this.props.removeProcedure(
            this.props.form.form.procedures, 
            procedure
        );
    }

    handleTestForm(form){
        this.props.testForm(form);
    }

    handleRemoveForm(form) {
        bootbox.confirm({
            message: this.props.rempoveMessage !== undefined ? this.props.rempoveMessage : Lang.get('fields.delete_row_alert'),
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
            callback: result => result ? this.props.removeForm(this.props.form.form) : null
        });
    }

    handleSubmit() {        
        return this.validate() 
            ? this.props.saveForm(this.props.form)
            : false;
    }

    validate() {

        this.setState({
            errors: {
                identifier: !this.props.form.form.identifier ? true : false,
                name: !this.props.form.form.name ? true : false, 
                service_id: !this.props.form.form.service_id ? true : false,
            }
        });

        switch(this.getFormType()) {
            case 'fiche':
            case 'table':
                if(!this.props.form.form.identifier || !this.props.form.form.name || !this.props.form.form.service_id) {
                    return false;
                }
            break;
            
            default: 
                if(!this.props.form.form.identifier || !this.props.form.form.name) {
                    return false;
                }
            break;
        }

        this.setState({
            errors: {
                identifier: null,
                name: null,
                service_id: null
            }
        });

        return true;
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
            .then(response => {
                window.location.href = routes['extranet.elements-models.forms.update'].replace(':id',response.data.model.id);
            })
            .catch(error => toastr.error(error.response.data.message));
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

    getTableFicheProcedure()
    {
        return this.props.form.form.procedures.length > 0 
            ? this.props.form.form.procedures[0] 
            : null;
    }


    // ==============================
    // Renderers
    // ==============================
    renderProcedureObjects() {
        return (
            <div>
                {this.props.form.currentProcedure !== null && this.props.form.currentProcedure.fields !== undefined && this.props.form.currentProcedure.fields.map((object, index) => 
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
                            onEdit={() => {
                                this.props.openModalEditObject(this.props.form.currentProcedure, JSON.parse(JSON.stringify(object)))
                            }}
                            onRemove={ this.handleRemoveObject.bind(this, this.getTableFicheProcedure(), object) }
                        />
                    </div>
                )}
                <BoxAddLarge
                    title='Ajouter un champ'
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.openModalCreateObject();
                    }}
                />
            </div>
        )
    }

    renderProcedures() {
        let procedures = this.props.form.form.procedures;

        procedures.sort((a, b) => {
            return parseInt(a.order) - parseInt(b.order);
        });

        let displayProcedures = this.props.form.form.procedures.map((procedure, index) =>
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
                    onEdit={() => this.props.openModalProcedure(JSON.parse(JSON.stringify(procedure)))}
                    onRemove={() => this.props.removeProcedure(this.props.form.form.procedures, procedure)}
                />
            </div>
        )
        return (
            <div>
                {displayProcedures}
                
                <BoxAddLarge
                    title='Ajouter'
                    onClick={() => {
                        this.props.openModalProcedure();
                    }}
                />
            </div>
        )
    }

    render() {

        const saved = this.props.form.form.id == null ? false : true;


        return (
            <div className="forms-update">

                <ModalTestForm
                    id={'modal-test-form'}
                    icon={'fas fa-bars'}
                    size={'medium'}
                    title={'Test Json'}
                    display={this.props.form.displayTestForm}
                    zIndex={10000}
                />

                <ModalProcedures
                    id={'modal-edit-procedures'}
                    icon={'fas fa-bars'}
                    size={'large'}
                    title={'Test Json'}
                    display={this.props.form.displayProcedureModal}
                    procedure={this.props.form.currentProcedure}
                    zIndex={10000}
                />

                <ModalObject
                    id={'modal-edit-object'}
                    icon={'fas fa-bars'}
                    size={'medium'}
                    title={'Object | Configuration'}
                    display={this.props.form.displayObjectModal}
                    object={this.props.form.currentObject}
                    procedure={this.props.form.currentProcedure}
                    zIndex={10000}
                    onModalClose={() => this.props.closeModalProcedureObject()}
                />
               
                <BarTitle
                    icon={this.props.form.form.icon}
                    title={this.props.form.form.name}
                    backRoute={routes['extranet.elements-models.forms.index']}
                >
                    {saved && 
                        <ButtonSecondary
                            label={'Test form'}
                            icon={'fas fa-sync-alt'}
                            onClick={this.handleTestForm.bind(this)}
                        />
                    }

                    {(saved && (this.getFormType() == "table" || this.getFormType() == "fiche")) && 
                        <ButtonSecondary
                            label={'Importer les champs'}
                            icon={'fas fa-sync-alt'}
                            onClick={e => {
                                e.preventDefault();

                                bootbox.confirm({
                                    message: "Attention ! Si vous importez des champs, vous perderez les champs actuellement configurés. Êtes-vous sûr de vouloir importer les champs du service ?",
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
                                    callback: result => result ? this.props.importFieldsFromService(this.props.form.form.service_id) : null
                                });
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
                                label: 'Supprimer',
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
                                </div>
                            }

                            {(this.getFormType() == "table" || this.getFormType() == "fiche") && 
                                <div>
                                    { this.renderProcedureObjects() }
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
                            error={this.state.errors.name}
                        />
                        
                        <InputField
                            label={'Identifier'}
                            value={this.props.form.form.identifier}
                            name={'identifier'}
                            onChange={this.props.updateField}
                            error={this.state.errors.identifier}
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


                        {(this.getFormType() == "table" || this.getFormType() == "fiche") && 
                            <SelectField
                                label={'Service'}
                                value={this.props.form.form.service_id}
                                name={'service_id'}
                                arrayOfOptions={this.state.services}
                                onChange={this.props.updateField}
                                error={this.state.errors.service_id}
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
        
        openModalProcedure: (procedure) => {
            return dispatch(openModalProcedure(procedure));
        },

        closeModalProcedure: () => {
            return dispatch(closeModalProcedure());
        },

        // ==============================
        // Procedures FIELDS
        // ==============================
        openModalEditObject: (procedure, object) => {
            return dispatch(openModalEditObject(procedure, object));
        },

        openModalCreateObject: () => {
            return dispatch(openModalCreateObject());
        },

        removeProcedureObject: (procedures, procedure, object) => {
            return dispatch(removeProcedureObject(procedures, procedure, object));
        },

        importFieldsFromService: (servideId) => {
            return dispatch(importFieldsFromService(servideId));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementsModelsFormRedux);

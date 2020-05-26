import React, { Component } from 'react';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import InputField from '../Layout/Fields/InputField';
import ButtonDropdown from '../Layout/ButtonDropdown';
import DragField from './Layout/DragField';
import SimpleTabs from '../Layout/TabButton';
import { connect } from 'react-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {
    addRow,
    initStateTemplate,
    submitForm,
    updateField,
    loadTemplate,
    deleteTemplate
} from './actions';

import PageBuilder from '../PageBuilder/PageBuilder';

class TemplateRedux extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.props.initStateTemplate(this.props);

        if(this.props.templateId) {
            this.props.loadTemplate(this.props.templateId);
        }
    }


    // ==============================
    // Handlers
    // ==============================

    handleDeleteTemplate() {
        bootbox.confirm({
            message:  Lang.get('fields.sure'),
            buttons: {
                confirm: {
                    label: Lang.get('fields.si'),
                    className: 'btn-primary'
                },
                cancel: {
                    label:  Lang.get('fields.no'),
                    className: 'btn-default'
                }
            },
            callback: function (result) {
              if(result){
                this.props.deleteTemplate(this.props.templateId, function(response){
                    window.location.replace(routes["template.create"]);
                });
              }
            }.bind(this)
        });
    }

    handleFieldChange(name, value) {
        this.props.updateField(name, value);
    }

    /**
     * Check if all element required fields are added to template. 
     * Necessary to process submit.
     */
    allRequiredAdded() {
        var fields = this.props.template.fields;
        for(var key in fields){
            if(fields[key].required && !fields[key].added){
                return false;
            }
        }
        return true;
    }

    handleSubmit() {
        var self = this;

        if(this.props.template.errors) {
            toastr.error('Champ non défini dans la template');
            return;
        }

        if(self.props.template.form.id && !this.allRequiredAdded()){
            toastr.error('Tous les champs obligatoires doivent être ajoutés');
            return;
        }

        this.props.submitForm(this.props.template.form, function(response){
            if(!self.props.template.form.id) {
                window.location.replace(routes["template"].replace(':id', response.id));
            }

        });
    }

    handleLayoutChange(layout) {
        this.props.updateField('layout', layout);
    }

    // ==============================
    // Renderers
    // ==============================

    renderFields() {

        if(!this.props.template || !this.props.template.fields){
            return null;
        }

        return this.props.template.fields.map((item,index) => 
            <DragField
                key={index}
                definition={item}
                label={item.name}
                icon={item.icon}
            />
        );
    }
    

    render() {
        const initLayout = this.props.template.form.layout;

        

        return (
            <div className="element-template">

                <BarTitle
                    icon={'far fa-list-alt'}
                    title={'Formulario Name'}
                    backRoute={routes['extranet.elements.index']}
                    slot={<SimpleTabs routes={this.props.template.tabsRoutes} />}
                >
                    {this.props.elementId &&
                    <ButtonDropdown
                        label={'Select Template'}
                        list={this.props.template.templatesList}
                    />
                    }
                    <ButtonPrimary
                        label={'Sauvegarder'}
                        icon={'fa fa-save'}
                        onClick={this.handleSubmit.bind(this)}
                    />
                </BarTitle>

                
                <DragDropContextProvider backend={HTML5Backend}>
                    <div className="container rightbar-page content">
                        
                        {initLayout != null && 
                            <PageBuilder 
                                fields={this.props.template.fields}
                                initLayout={initLayout}
                                enableWidgets={false}
                                nonAllowedFields={[
                                    "contents","boolean","date","file",
                                    "images","key_values","localization","slug",
                                    "translated_file","link","url","video","richtext"
                                ]}
                                onChange={this.handleLayoutChange.bind(this)}
                            />
                        }

                        <div className="sidebar">
                            <InputField
                                label={'Nom'}
                                name={'name'}
                                value={this.props.template.form.name}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                            
                            <hr />
                            <h3>AJOUTER CHAMPS</h3>
                            
                            
                                <div className="field-list">
                                    {this.renderFields()}
                                </div>
                            
                            <hr />

                            {this.props.template.form.id && 
                                <div className="text-right">
                                    <a className="btn btn-link text-danger" onClick={this.handleDeleteTemplate.bind(this)}><i className="fa fa-trash"></i> Supprimer</a>
                                </div>
                            }
                    
                        </div>
                    </div>
                </DragDropContextProvider>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        template: state.template
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initStateTemplate: (payload) => {
            return dispatch(initStateTemplate(payload));
        },
        deleteTemplate: (id, onSuccess) => {
            return dispatch(deleteTemplate(id, onSuccess));
        },
        loadTemplate: (id) => {
            return dispatch(loadTemplate(id));
        },
        updateField: (name, value) => {
            return dispatch(updateField(name, value));
        },
        submitForm: (payload, onSuccess) => {
            return dispatch(submitForm(payload, onSuccess));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateRedux);

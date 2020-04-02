import React, { Component } from 'react';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
//import BoxAddGroup from '../Layout/BoxAddGroup';
import InputField from '../Layout/Fields/InputField';
import ButtonDropdown from '../Layout/ButtonDropdown';
//import { Col } from 'react-bootstrap';
//import RowContainer from './Layout/RowContainer';
//import ColContainer from './Layout/ColContainer';
//import ColField from './Layout/ColField';
import DragField from './Layout/DragField';
import SimpleTabs from '../Layout/TabButton';
import { connect } from 'react-redux';

import {
    addRow,
    initStateTemplate,
    loadForm,
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

    handleSubmit() {
        this.props.submitForm(this.props.template.form, function(response){
            window.location.replace(routes["template"].replace(':id', response.id));
        });
    }

    // ==============================
    // Renderers
    // ==============================

    handleLayoutChange(layout) {
        this.props.updateField('layout', layout);
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

                <div className="container rightbar-page content">
                    
                    {initLayout != null && 
                        <PageBuilder 
                            fields={this.props.template.fields}
                            initLayout={initLayout}
                            enableWidgets={false}
                            nonAllowedFields={[
                                "contents","boolean","date","file",
                                "images","key_values","localization","slug",
                                "translated_file","link","url","video"
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
                        <DragField
                            label={'Element Field 3'}
                            icon={'fas fa-font'}
                            arrayOfItems={this.state.elements}
                        />
                        <DragField
                            label={'Element Field 3'}
                            icon={'fas fa-font'}
                        />
                        <DragField
                            label={'Element Field 3'}
                            icon={'fas fa-font'}
                        />
                        <DragField
                            label={'Element Field 3'}
                            icon={'fas fa-font'}
                        />
                        <hr />

                        {this.props.template.form.id && 
                            <div className="text-right">
                                <a className="btn btn-link text-danger" onClick={this.handleDeleteTemplate.bind(this)}><i className="fa fa-trash"></i> Supprimer</a>
                            </div>
                        }
                  
                    </div>
                </div>
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

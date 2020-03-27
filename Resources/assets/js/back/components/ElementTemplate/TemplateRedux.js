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
    loadTemplate
} from './actions';
import PageBuilder from '../PageBuilder/PageBuilder';

class TemplateRedux extends Component {

    constructor(props) {
        super(props);

        var templates = props.templates ? JSON.parse(atob(props.templates)) : [];
        var elementId = props.elementId;
        var templateId =  props.templateId ? props.templateId : null;

        // BUILD Template list
        // FIXME : move to reducer ?        
        var templatesList = [];
        let arr = Object.keys(templates).map(key => {
            templatesList.push({
                label: templates[key].name,
                icon: 'fa fa-file',
                route: routes.template.replace(':id', templates[key].id),
            });
        });

        templatesList.push({
            label: 'Nouveau Template',
            icon: 'fa fa-plus-circle',
            route: routes['template.create']
        });

        this.state = {
            templatesList: templatesList
        };

        this.props.initStateTemplate(this.props);

        if(templateId) {
            this.props.loadTemplate(templateId);
        }
    }


    // ==============================
    // Handlers
    // ==============================

    handleFieldChange(name, value) {
        this.props.updateField(name, value);
    }

    handleAddTemplate() {
        console.log("handleAddTemplate");
    }

    handleSubmit() {
        this.props.submitForm(this.props.template.form);
    }

    // ==============================
    // Renderers
    // ==============================

    handleLayoutChange(layout) {
        this.props.updateField('layout', layout);
    }

    render() {
        return (
            <div className="element-template">

                <BarTitle
                    icon={'far fa-list-alt'}
                    title={'Formulario Name'}
                    backRoute={routes['extranet.elements.index']}
                    slot={<SimpleTabs />}
                >
                    <ButtonDropdown
                        label={'Select Template'}
                        list={this.state.templatesList}
                    />
                    <ButtonPrimary
                        label={'Sauvegarder'}
                        icon={'fa fa-save'}
                        onClick={this.handleSubmit.bind(this)}
                    />
                </BarTitle>

                <div className="container rightbar-page content">
                    
                    <PageBuilder 
                        //pages={[]}
                        //tags={[]}
                        //categories={[]}
                        //fields={[]}
                        layout={{}}
                        //users={[]}
                        enableWidgets={false}
                        nonAllowedFields={[
                            "contents","boolean","date","file",
                            "images","key_values","localization","slug",
                            "translated_file","link","url","video"
                        ]}
                        onChange={this.handleLayoutChange.bind(this)}
                    />

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
                            label={'row'}
                            icon={'fas fa-font'}
                            arrayOfItems={this.state.champs}
                        />
                        <DragField
                            label={'row'}
                            icon={'fas fa-font'}

                        />
                        <DragField
                            label={'row'}
                            icon={'fas fa-font'}
                        />
                        <DragField
                            label={'row'}
                            icon={'fas fa-font'}
                        />
                        <hr />
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
        initStateTemplate: (props) => {
            return dispatch(initStateTemplate(props));
        },
        loadTemplate: (id) => {
            return dispatch(loadTemplate(id));
        },
        updateField: (name, value) => {
            return dispatch(updateField(name, value));
        },
        submitForm: (payload) => {
            return dispatch(submitForm(payload));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateRedux);

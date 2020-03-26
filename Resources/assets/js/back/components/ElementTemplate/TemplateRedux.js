import React, { Component } from 'react';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
//import BoxAddGroup from '../Layout/BoxAddGroup';
import InputField from '../Layout/Fields/InputField';
//import ButtonDropdown from '../Layout/ButtonDropdown';
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
    updateField,
    addField,
    saveForm,
    createForm,
    updateForm,
    removeForm,
} from './actions';
import PageBuilder from '../PageBuilder/PageBuilder';

class TemplateRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.props.initStateTemplate(this.props);
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
        console.log("handleSubmit");
        this.props.saveForm(this.props);
    }

    // ==============================
    // Renderers
    // ==============================

    handleLayoutChange(layout) {
        console.log("TemplateRedux :: handleLayoutChange",layout);
    }

    render() {
        return (
            <div className="element-template">

                {/* <BarTitle
                    icon={'far fa-list-alt'}
                    title={'Formulario Name'}
                    backRoute={routes['extranet.elements.index']}
                    slot={<SimpleTabs />}
                >
                    <ButtonDropdown
                        label={'Select Template'}
                        list={[
                            {
                                label: 'Template-1',
                                icon: 'fa fa-file',
                            },
                            {
                                label: 'Template-2',
                                icon: 'fa fa-file',
                            },
                            {
                                label: 'Nouveau Template',
                                icon: 'fa fa-plus-circle',
                                onClick: this.handleAddTemplate.bind(this),
                            },
                        ]}
                    />
                    <ButtonPrimary
                        label={'Sauvegarder'}
                        icon={'fa fa-save'}
                        onClick={this.handleSubmit.bind(this)}
                    />
                </BarTitle> */}

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
        template: state.template,
        layout: state.template.layout
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initStateTemplate: () => {
            return dispatch(initStateTemplate());
        },
        loadForm: () => {
            return dispatch(loadForm());
        },
        updateField: (name, value) => {
            return dispatch(updateField(name, value));
        },
        saveForm: () => {
            return dispatch(saveForm());
        },
        createForm: () => {
            return dispatch(createForm());
        },
        updateForm: () => {
            return dispatch(updateForm());
        },
        removeForm: () => {
            return dispatch(removeForm());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateRedux);

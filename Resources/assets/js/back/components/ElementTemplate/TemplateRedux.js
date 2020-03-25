import React, { Component } from 'react';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import BoxAddGroup from '../Layout/BoxAddGroup';
import InputField from '../Layout/Fields/InputField';
import ButtonDropdown from '../Layout/ButtonDropdown';
import { Col } from 'react-bootstrap';
import RowContainer from './Layout/RowContainer';
import ColContainer from './Layout/ColContainer';
import ColField from './Layout/ColField';
import DragField from './Layout/DragField';
import SimpleTabs from '../Layout/TabButton';
import { connect } from 'react-redux';
import {
    initStateTemplate,
    loadForm,
    updateField,
    addField,
    saveForm,
    createForm,
    updateForm,
    removeForm,
} from './actions/template';

class TemplateRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
      
        };
        this.props.initStateTemplate(this.props);
        // this.props.updateField(this.props);
        // this.props.addField(this.props);
       
        // this.props.loadForm(this.props);
        // this.props.createForm(this.props);
        // this.props.updateForm(this.props);
        // this.props.removeForm(this.props);
        // console.log('Estas son las props :: ', this.props);
    }

    // ==============================
    // Handlers
    // ==============================

    handleFieldChange(name, value) {
        this.props.updateField(name, value);
    }

    // RowContainer
    handleDuplicateRowContainer() {
        console.log("handleDuplicateRowContainer");
    }

    handleRemoveRowContainer() {
        console.log("handleRemoveRowContainer");
    }

    handleEditRowContainer() {
        console.log("handleEditRowContainer");
    }

    handleDownRowContainer() {
        console.log("handleDownRowContainer");
    }

    handleUpRowContainer() {
        console.log("handleUpRowContainer");
    }

    //ColContainer
    handleEditColContainer() {
        console.log("handleEditColContainer")
    }

    handleAddColContainer() {
        console.log("handleAddColContainer");
    }

    // ColField
    handleUpColField() {
        console.log("handleUpColField");
    }

    handleDownColField() {
        console.log("handleDownColField");
    }

    handleRemoveColField() {
        console.log("handleRemoveColField");
    }

    handleAddLine() {
        console.log("handleAddLine");
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
                </BarTitle>
                
                <div className="container rightbar-page">
                    <div className="col-xs-9 page-content elements-template">
                        <RowContainer
                            editButton={true}
                            columnsButton={true}
                            duplicateButton={true}
                            removeButton={true}
                            onUp={this.handleUpRowContainer.bind(this)}
                            onDown={this.handleDownRowContainer.bind(this)}
                            onEdit={this.handleEditRowContainer.bind(this)}
                            onDuplicate={this.handleDuplicateRowContainer.bind(this)}
                            onRemove={this.handleRemoveRowContainer.bind(this)}
                        >
                            <Col md={4}>
                                <ColContainer
                                    editButton={true}
                                    onAdd={this.handleAddColContainer.bind(this)}
                                    onEdit={this.handleEditColContainer.bind(this)}
                                >
                                    <ColField
                                        label={'label'}
                                        onUp={this.handleUpColField.bind(this)}
                                        onDown={this.handleDownColField.bind(this)}
                                        onRemove={this.handleRemoveColField.bind(this)}
                                    />
                                </ColContainer>
                            </Col>
                            <Col md={4}>
                                <ColContainer
                                    editButton={true}
                                    onAdd={this.handleAddColContainer.bind(this)}
                                    onEdit={this.handleEditColContainer.bind(this)}
                                />
                            </Col>
                            <Col md={4}>
                                <ColContainer
                                    editButton={false}
                                    onAdd={this.handleAddColContainer.bind(this)}
                                    onEdit={this.handleEditColContainer.bind(this)}
                                />
                            </Col>
                        </RowContainer>
                       
                        <BoxAddGroup
                            identifier='1'
                            title='Ajouter une ligne'
                            onClick={this.handleAddLine.bind(this)}
                        />
                    </div>
                    <div className="sidebar">
                        <InputField
                            label={'Nom'}
                            name={'name'}
                            value={this.props.value}
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
        addField: () => {
            return dispatch(addField());
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

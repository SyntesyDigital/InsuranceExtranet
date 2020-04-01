import React, { Component } from 'react'
import { connect } from 'react-redux';
import { initState } from './actions/';
import ElementContainer from './ElementContainer';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper'
import ElementSidebar from './ElementSidebar';
import ElementDropZoneContainer from './ElementDropZoneContainer';
import ElementDragField from './ElementDragField';
import ElementBar from './ElementBar';
import ElementModal from './ElementModal';
import ElementParametersModal from './ElementParameters/ElementParametersModal';
import ModalContents from './Contents/ModalContents';
import ModalParameters from './Parameters/ModalParameters';
import ModalElements from './Settings/HasModal/ModalElements';
import ModalElementParameters from './Settings/HasModal/ModalElementParameters';

import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import ButtonDropdown from '../Layout/ButtonDropdown';
import SimpleTabs from '../Layout/TabButton';

import { submitForm } from './actions/';

class ElementForm extends Component {

    // ==============================
    // Constructor
    // ==============================

    constructor(props) {
        super(props);

        this.props.initState({
            element: props.element ? JSON.parse(atob(props.element)) : null,
            fields: props.fields ? JSON.parse(atob(props.fields)) : [],
            model: props.model ? JSON.parse(atob(props.model)) : null,
            fieldsList: props.fields ? JSON.parse(atob(props.fields)) : [],
            wsModelIdentifier: props.wsModelIdentifier ? props.wsModelIdentifier : null,
            wsModel: props.wsModel ? props.wsModel : null,
            wsModelFormat: props.wsModelFormat ? props.wsModelFormat : null,
            wsModelExemple: props.wsModelExemple ? props.wsModelExemple : '',
            elementType: props.elementType ? props.elementType : null,
            parametersList: props.parametersList ? JSON.parse(atob(props.parametersList)) : [],
            parameters: props.parameters ? JSON.parse(atob(props.parameters)) : [],
            variables: props.variables ? JSON.parse(atob(props.variables)) : [],
            procedures: props.procedures ? JSON.parse(atob(props.procedures)) : [],
            tabsRoutes: props.tabsRoutes ? JSON.parse(atob(props.tabsRoutes)) : [],
        });
    }
    

    // ==============================
    // Handlers
    // ==============================

    handleAddTemplate() {
        console.log("handleAddTemplate");
    }

    handleSubmit() {
        this.props.submitForm({
            elementId: this.props.app.element != null && this.props.app.element.id !== undefined ? this.props.app.element.id : null,
            name: this.props.app.inputs.name,
            identifier: this.props.app.inputs.identifier,
            fields: this.props.app.fields,
            icon: this.props.app.inputs.icon.value ? this.props.app.inputs.icon.value : null,
            wsModelIdentifier: this.props.app.wsModelIdentifier ? this.props.app.wsModelIdentifier : null,
            wsModel: this.props.app.wsModel ? this.props.app.wsModel : null,
            wsModelFormat: this.props.app.wsModelFormat ? this.props.app.wsModelFormat : null,
            wsModelExemple: this.props.app.wsModelExemple ? this.props.app.wsModelExemple : null,
            elementType: this.props.app.elementType ? this.props.app.elementType : null,
            parameters: this.props.app.parameters ? this.props.app.parameters : null
        });
    }


    // ==============================
    // Renderers
    // ==============================
    renderFields() {
        var result = null;
        if (this.props.app.fieldsList) {

            result = this.props.app.fieldsList.map((item, i) =>
                <ElementDragField definition={item} key={i} />
            )
        }

        return result;

    }

    render() {
        return (
            <div id="model-container" className="element-template">
                <BarTitle
                    icon={'far fa-list-alt'}
                    title={'Formulario Name'}
                    backRoute={routes['extranet.elements.index']}
                    slot={ this.props.app.element && this.props.app.element.type != "table" ? <SimpleTabs routes={this.props.app.tabsRoutes} /> : null}
                >
                    <ButtonPrimary
                        label={'Sauvegarder'}
                        icon={'fa fa-save'}
                        onClick={this.handleSubmit.bind(this)}
                    />
                </BarTitle>

                <DragDropContextProvider backend={HTML5Backend}>
                    <div className="container rightbar-page">

                        <ElementModal />

                        {/* HasModal Settings Modals */}
                        <ModalElementParameters />
                        <ModalElements />

                        {/* HasLink Settings Modals */}
                        <ModalContents />
                        <ModalParameters />

                        {/* Modal to edit Element parameters settings */}
                        <ElementParametersModal />


                        <div className="col-md-9 page-content">
                            {
                                <ElementDropZoneContainer />
                            }
                        </div>

                        <ElementSidebar>
                            {this.renderFields()}
                        </ElementSidebar>

                    </div>
                </DragDropContextProvider>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initState: (payload) => {
            return dispatch(initState(payload));
        },
        submitForm: (data) => {
            return dispatch(submitForm(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementForm);

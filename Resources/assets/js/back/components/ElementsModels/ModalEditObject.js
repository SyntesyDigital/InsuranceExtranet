import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';
import ToggleField from '../Layout/Fields/ToggleField';
import SelectField from '../Layout/Fields/SelectField';
import { connect } from 'react-redux';

import {

    removeProcedureObject,
    closeModalProcedureObject,
    updateProcedureObjectField

} from './actions';


class ModalEditObject extends Component {

    constructor(props) {

        super(props);

        this.state = {

        };
    }

    // ==============================
    // Handlers
    // ==============================

    handleCancel() {
        console.log("handleCancel Procedure Object");
        this.props.closeModalProcedureObject();
    }

    handleFieldChange(name, value){
        
        const { currentObject } = this.props.form;
        console.log("Este es el objeto", currentObject);

        const { currentProcedure } = this.props.form;
        console.log("Este es el procedure", currentProcedure);

        this.props.updateProcedureObjectField(currentProcedure, currentObject, name, value);

        console.log("handleFieldChange", currentProcedure, currentObject, name, value);
    }

    // ==============================
    // Renderers
    // ==============================

    render() {
        
        const { currentObject } = this.props.form;

        console.log(currentObject);

        return (

            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={this.props.title}
                display={this.props.display}
                zIndex={10000}
                size={this.props.size}
                deleteButton={false}
                onModalClose={this.props.closeModalProcedureObject}
                onCancel={this.props.closeModalProcedureObject}
               
            >
                {currentObject != null &&

                    <div className="row">

                        <div className="col-xs-12 field-col">

                            <InputField
                                label={'Identifier (champ)'}
                                value={currentObject.identifier}
                                name={'identifier'}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Name (lib)'}
                                value={currentObject.name}
                                name={'name'}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <SelectField
                                label={'Type (Nature) (CTE, System, INPUT)'}
                                value={currentObject.typeNature}
                                name={'typeNature'}
                                arrayOfOptions={currentObject.typeNatures}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <SelectField
                                label={'Format (Text, num, etc)'}
                                value={currentObject.format}
                                name={'format'}
                                arrayOfOptions={currentObject.formats}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Default value (valeur)'}
                                name={'defaultValue'}
                                value={currentObject.defaultValue}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Boby (solo si es select)'}
                                name={'boby'}
                                value={currentObject.boby}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'JSON path (concreto para este campo)'}
                                name={'jsonPath'}
                                value={currentObject.jsonPath}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Example'}
                                name={'example'}
                                value={currentObject.example}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Configurable'}
                                name={'configurable'}
                                checked={currentObject.configurable}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Visible'}
                                name={'visible'}
                                checked={currentObject.visible}
                                onChange={this.handleFieldChange.bind(this)}
                            />

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
        openModalCreateObject: (procedure) => {
            return dispatch(openModalCreateObject(procedure));
        },

        openModalEditObject: (procedure, object) => {
            return dispatch(openModalEditObject(procedure, object));
        },
        
        updateProcedureObjectField: (procedure, object, name, value) => {
            return dispatch(updateProcedureObjectField(procedure, object, name, value));
        },

        removeProcedureObject: (procedure, object) => {
            return dispatch(removeProcedureObject(procedure, object));
        },

        closeModalProcedureObject: () => {
            return dispatch(closeModalProcedureObject());
        },

        moveProcedureObject: (procedure, object) => {
            return dispatch(moveProcedureObject(procedure, object));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalEditObject);


ModalEditObject.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,

    // onUpdateProcedureObjectField: PropTypes.func,
    onCloseModal: PropTypes.func
};

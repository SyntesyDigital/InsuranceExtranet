import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';
import ToggleField from '../Layout/Fields/ToggleField';
import SelectField from '../Layout/Fields/SelectField';
import { connect } from 'react-redux';

import {

    removeProcedureObject,
    closeModalProcedureObject

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

    // handleRemoveObject() {
    //     console.log("handleRemoveObject");
    //     this.props.removeProcedureObject(this.props.form.currentObject);
    // }

    // handleFieldChange(name, value) {
    //     console.log("handleFieldChange :: (name,value) ", name, value);
    //     const { object } = this.state;
    //     object[name] = value;
    //     this.setState({
    //         object: object
    //     });
    // }

    handleFieldChange(currentProcedure, currentObject, value, name){
        var currentProcedure = this.props.form
        console.log("handleFieldChange", currentProcedure, currentObject, value, name);
        this.props.updateProcedureObjectField(currentProcedure, currentObject, value, name);
    }

    // ==============================
    // Renderers
    // ==============================

    render() {

        const { currentObject } = this.props.form;

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
                                value={currentObject.object.identifier}
                                name={'CHAMP'}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Name (lib)'}
                                value={currentObject.object.name}
                                name={'LIB'}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <SelectField
                                label={'Type (Nature) (CTE, System, INPUT)'}
                                value={currentObject.object.typeNature.value}
                                name={'type-nature'}
                                arrayOfOptions={currentObject.object.typeNature}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <SelectField
                                label={'Format (Text, num, etc)'}
                                value={currentObject.object.format.value}
                                name={'type-format'}
                                arrayOfOptions={currentObject.object.formats}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Default value (valeur)'}
                                name={'VALEUR'}
                                value={currentObject.object.defaultValue}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Boby (solo si es select)'}
                                name={'BOBY'}
                                value={currentObject.object.boby}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'JSON path (concreto para este campo)'}
                                name={'OBJ_JSONP'}
                                value={currentObject.object.jsonPath}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Example'}
                                name={'EXEMPLE'}
                                value={currentObject.object.example}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Configurable'}
                                name={'CONF'}
                                checked={currentObject.object.configurable}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Visible'}
                                name={'VIS'}
                                checked={currentObject.object.visible}
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

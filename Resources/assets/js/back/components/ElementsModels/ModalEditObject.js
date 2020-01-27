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

    handleRemove() {
        console.log("handleRemove Object");
        this.props.removeProcedureObject(this.props.form.currentObject);
    }

    handleFieldChange(name, value) {
        console.log("handleFieldChange :: (name,value) ", name, value);
        const { object } = this.state;
        object[name] = value;
        this.setState({
            object: object
        });
    }

    // ==============================
    // Renderers
    // ==============================

    render() {

        const { currentObject } = this.props.form.form;

        return (

            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={this.props.title}
                display={this.props.display}
                zIndex={10000}
                size={this.props.size}

                onModalClose={this.props.closeModalProcedureObject}
                onCancel={this.props.closeModalProcedureObject}
                onRemove={this.handleRemove.bind(this)}
            >
                {currentObject != null &&
                
                    <div className="row">

                        <div className="col-xs-12 field-col">

                            <InputField
                                label={'Identifier (champ)'}
                                value={currentObject.identifier}
                                name={'CHAMP'}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Name (lib)'}
                                value={currentObject.LIB}
                                name={'LIB'}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <SelectField
                                label={'Type (Nature) (CTE, System, INPUT)'}
                                value={currentObject.NATURE}
                                name={'type-nature'}
                                arrayOfOptions={this.state.NATURE}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <SelectField
                                label={'Format (Text, num, etc)'}
                                value={currentObject.FORMAT}
                                name={'type-format'}
                                arrayOfOptions={currentObject.FORMAT}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Default value (valeur)'}
                                name={'VALEUR'}
                                value={currentObject.VALEUR}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Boby (solo si es select)'}
                                name={'BOBY'}
                                value={currentObject.BOBY}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'JSON path (concreto para este campo)'}
                                name={'OBJ_JSONP'}
                                value={currentObject.OBJ_JSONP}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Example'}
                                name={'EXEMPLE'}
                                value={currentObject.EXEMPLE}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Configurable'}
                                name={'CONF'}
                                checked={currentObject.CONF}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Visible'}
                                name={'VIS'}
                                checked={currentObject.VIS}
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

    onUpdateProcedureObjectField: PropTypes.func,
    onCloseModal: PropTypes.func
};

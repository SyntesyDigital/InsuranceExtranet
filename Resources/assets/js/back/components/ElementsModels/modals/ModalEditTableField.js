import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Layout/Modal';
import InputField from '../../Layout/Fields/InputField';
import SelectField from '../../Layout/Fields/SelectField';
import { connect } from 'react-redux';
import {
    removeProcedureObject,
    closeModalProcedureObject,
    saveProcedureObject
} from '../actions';

class ModalEditTableField extends Component {

    constructor(props) {

        super(props);

        var formats = [];
        for(var key in MODELS_FIELDS){
            formats.push({
                name : key,
                value : key
            });
        }

        this.state = {
            formats: formats,
            typeNature: [
                {
                    name: 'input',
                    value: 'INPUT'
                },
                {
                    name: 'system',
                    value: 'SYSTEM'
                },
                {
                    name: 'cte',
                    value: 'CTE'
                }
            ],
            object : null
        };
    }

    componentDidUpdate(prevProps,prevState) {
        if(!prevProps.display && this.props.display) {
            this.setState({
                object : this.props.object
            });
        }
    }

    // ==============================
    // Handlers
    // ==============================

    handleCancel() {
        console.log("handleCancel Procedure Object");
        this.props.closeModalProcedureObject();
    }

    handleFieldChange(name, value){
        const {object} = this.state;
        object[name] = value;
        this.setState({
            object : object
        });
    }

    getProcedureIndex(procedures,procedure){
        for(var key in procedures){
            if(procedures[key].id == procedure.id){
                return key;
            }
        }
        return null;
    }

    handleSubmit() {

        var index = this.getProcedureIndex(
            this.props.form.form.procedures,
            this.props.form.currentProcedure,
        );

        this.props.saveProcedureObject(
            this.props.form.form.procedures,
            this.props.form.form.procedures[0],
            this.state.object
        );
    }

    handleRemove() {
        var index = this.getProcedureIndex(
            this.props.form.form.procedures,
            this.props.form.currentProcedure,
        );

        this.props.removeProcedureObject(
            this.props.form.form.procedures,
            this.props.form.form.procedures[index],
            this.state.object
        );
        this.props.closeModalProcedureObject();
    }

    // ==============================
    // Renderers
    // ==============================



    render() {
        
        const { currentObject } = this.props.form;
        const saved = currentObject != null ? currentObject.id != null : false;

        if(currentObject == null || this.props.procedure == null)
            return null;

        var currentJsonpath = this.props.procedure.repeatable_jsonpath
            +(currentObject.jsonpath != null ? currentObject.jsonpath : '')
            +currentObject.identifier;

        return (

            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={this.props.title}
                display={this.props.display}
                zIndex={10000}
                size={this.props.size}
                onModalClose={this.props.closeModalProcedureObject}
                deleteButton={saved ? true : false}
                onCancel={this.props.closeModalProcedureObject}
                onSubmit={this.handleSubmit.bind(this)}
                onRemove={this.handleRemove.bind(this)}
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
                                label={'Format (Text, num, etc)'}
                                value={currentObject.format}
                                name={'format'}
                                arrayOfOptions={this.state.formats}
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
        
        saveProcedureObject: (procedures, procedure, object) => {
            return dispatch(saveProcedureObject(procedures, procedure, object));
        },

        removeProcedureObject: (procedures,procedure, object) => {
            return dispatch(removeProcedureObject(procedures, procedure, object));
        },

        closeModalProcedureObject: () => {
            return dispatch(closeModalProcedureObject());
        },

        moveProcedureObject: (procedure, object) => {
            return dispatch(moveProcedureObject(procedure, object));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalEditTableField);


ModalEditTableField.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,

    // onUpdateProcedureObjectField: PropTypes.func,
    onCloseModal: PropTypes.func
};

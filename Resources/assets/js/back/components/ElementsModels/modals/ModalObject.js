import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Layout/Modal';
import InputField from '../../Layout/Fields/InputField';
import ToggleField from '../../Layout/Fields/ToggleField';
import SelectField from '../../Layout/Fields/SelectField';
import { connect } from 'react-redux';

import {
    removeProcedureObject,
    closeModalProcedureObject,
    saveProcedureObject
} from '../actions';

class ModalObject extends Component {

    constructor(props) {

        super(props);

        let types = [
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
        ];

        let formats = Object.keys(MODELS_FIELDS).reduce((acc, key) => {
            acc.push({
                name : key,
                value : key
            });
            return acc;
        }, [{
            name : '---',
            value : null
        }]);

        this.state = {
            formats: formats,
            typeNature: types,
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

    getCurrentProcedureIndex() {
        return this.getProcedureIndex(
            this.props.form.form.procedures, 
            this.props.form.currentProcedure
        );
    }

    handleSubmit() {
        let index = this.getCurrentProcedureIndex();

        this.props.saveProcedureObject(
            this.props.form.form.procedures, 
            this.props.form.form.procedures[index], 
            this.state.object
        );
    }

    handleRemove() {
        let index = this.getCurrentProcedureIndex();

        this.props.removeProcedureObject(
            this.props.form.form.procedures,
            this.props.form.form.procedures[index],
            this.state.object
        );

        this.props.closeModalProcedureObject();
    }

    // ==============================
    // Getters
    // ==============================
    isForm() {
        return this.props.form.form.isForm;
    }

    // ==============================
    // Renderers
    // ==============================
    render() {
        
        const { currentObject } = this.props.form;
        const saved = currentObject != null ? currentObject.id != null : false;

        if(currentObject == null || this.props.procedure == null) {
            return null;
        }
            
        var currentJsonpath = this.props.procedure.repeatable == "1"
            ? '[subJSON] $.'+(currentObject.jsonpath != null ? currentObject.jsonpath : '')+currentObject.identifier
            : this.props.procedure.repeatable_jsonpath + (currentObject.jsonpath != null ? currentObject.jsonpath : '') + currentObject.identifier;

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
                                label={'Name (lib)'}
                                value={currentObject.name}
                                name={'name'}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <InputField
                                label={'Identifier (champ)'}
                                value={currentObject.identifier}
                                name={'identifier'}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            {this.isForm() && 
                                <SelectField
                                    label={'Type (Nature) (CTE, System, INPUT)'}
                                    value={currentObject.type}
                                    name={'type'}
                                    arrayOfOptions={this.state.typeNature}
                                    onChange={this.handleFieldChange.bind(this)}
                                />
                            }

                            {currentObject.type == 'INPUT' && 
                                <SelectField
                                    label={'Format (Text, num, etc)'}
                                    value={currentObject.format}
                                    name={'format'}
                                    arrayOfOptions={this.state.formats}
                                    onChange={this.handleFieldChange.bind(this)}
                                />
                            }

                            {this.isForm() && 
                            <InputField
                                label={'Default value ( System variables avec _ ex : _idPol)'}
                                name={'default_value'}
                                value={currentObject.default_value}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                            }

                            {this.isForm() && (currentObject.format == 'select' || currentObject.format == 'radio' || currentObject.format == 'multi' ) && 
                                <InputField
                                    label={'Boby'}
                                    name={'boby'}
                                    value={currentObject.boby}
                                    onChange={this.handleFieldChange.bind(this)}
                                />
                            }

                            <InputField
                                label={'JSON path (résultat : '+currentJsonpath+' ) '}
                                name={'jsonpath'}
                                value={currentObject.jsonpath}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            {this.isForm() && 
                            <InputField
                                label={'Example'}
                                name={'example'}
                                value={currentObject.example}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                            }

                            {this.isForm() && 
                            <ToggleField
                                label={'Configurable'}
                                name={'configurable'}
                                checked={currentObject.configurable == "1" ? true : false}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                            }

                            {/*

                            {this.isForm() && 
                            <ToggleField
                                label={'Visible'}
                                name={'visible'}
                                checked={currentObject.visible == "1" ? true : false}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                            }

                            */}

                            {this.isForm() && 
                            <ToggleField
                                label={'Obligatoire'}
                                name={'required'}
                                checked={currentObject.required == "1" ? true : false}
                                onChange={this.handleFieldChange.bind(this)}
                            />
                            }

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalObject);

ModalObject.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    onCloseModal: PropTypes.func
};

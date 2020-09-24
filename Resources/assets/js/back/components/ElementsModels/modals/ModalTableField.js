import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Layout/Modal';
import InputField from '../../Layout/Fields/InputField';
import SelectField from '../../Layout/Fields/SelectField';
import { connect } from 'react-redux';


import {
    closeModalTableField
} from '../actions';

class ModalTableField extends Component {

    constructor(props) {
        super(props);

        let formats = Object.keys(MODELS_FIELDS).reduce((acc, key) => {
            acc.push({
                name : key,
                value : key
            });
            return acc;
        }, []);

        this.state = {
            formats: formats,
            form: {
                identifier : this.props.table.field ? this.props.table.field.identifier : null,
                name: this.props.table.field ? this.props.table.field.name : null,
                format: this.props.table.field ? this.props.table.field.format : formats[0].value, 
            }
        };
    }

    // ==============================
    // Handlers
    // ==============================

    handleCancel() {
        this.props.closeModalEditTableField();
    }

    handleFieldChange(name, value){
        const {form} = this.state;
        form[name] = value;

        this.setState({
            form: form
        });
    }
    
    handleSubmit() {
        console.log('SUBMIT ===>', this.state);
    }

    handleRemove() {
       
    }

    // ==============================
    // Getter
    // ==============================
    getFieldValue(name) {
        return this.state.form[name];
        // return this.state.form && this.props.table.field[name] !== undefined
        //     ? this.props.table.field
        //     : null; 
    }
    
    // ==============================
    // Renderers
    // ==============================
    render() {
        
        // const { currentObject } = this.props.table;
        
        // const saved = currentObject != null 
        //     ? currentObject.id != null 
        //     : false;

        // if(currentObject == null)
        //     return null;

        // var currentJsonpath = this.props.procedure.repeatable_jsonpath
        //     +(currentObject.jsonpath != null ? currentObject.jsonpath : '')
        //     +currentObject.identifier;

        return (
            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={this.props.title}
                display={this.props.table.displayModal}
                zIndex={10000}
                size={this.props.size}
                onModalClose={() => this.props.closeModalTableField()}
                deleteButton={false}
                onCancel={() => this.props.closeModalTableField()}
                onSubmit={this.handleSubmit.bind(this)}
                onRemove={this.handleRemove.bind(this)}
            >
                <div className="row">
                    <div className="col-xs-12 field-col">

                        <InputField
                            label={'Identifier (champ)'}
                            value={this.getFieldValue('identifier')}
                            name={'identifier'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <InputField
                            label={'Name (lib)'}
                            value={this.getFieldValue('name')}
                            name={'name'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <SelectField
                            label={'Format (Text, num, etc)'}
                            value={this.getFieldValue('format')}
                            name={'format'}
                            arrayOfOptions={this.state.formats}
                            onChange={this.handleFieldChange.bind(this)}
                        /> 

                    </div>
                </div>
            </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        table: state.table
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // saveProcedureObject: (procedures, procedure, object) => {
        //     return dispatch(saveProcedureObject(procedures, procedure, object));
        // },

        // removeProcedureObject: (procedures,procedure, object) => {
        //     return dispatch(removeProcedureObject(procedures, procedure, object));
        // },

        closeModalTableField: () => {return dispatch(closeModalTableField())},

        // moveProcedureObject: (procedure, object) => {
        //     return dispatch(moveProcedureObject(procedure, object));
        // },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalTableField);


ModalTableField.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    zIndex: PropTypes.number.isRequired,
    onCloseModal: PropTypes.func
};

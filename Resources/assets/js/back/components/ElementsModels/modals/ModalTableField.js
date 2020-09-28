import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Layout/Modal';
import InputField from '../../Layout/Fields/InputField';
import SelectField from '../../Layout/Fields/SelectField';
import { connect } from 'react-redux';


import {
    closeModalTableField,
    saveTableField,
    changeTableField
} from '../actions';

const formats = Object.keys(MODELS_FIELDS).reduce((acc, key) => {
    acc.push({
        name : key,
        value : key
    });
    return acc;
}, [{
    name : '---',
    value : null
}]);

class ModalTableField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formats: formats,
            errors: {
                identifier: null,
                name: null, 
                format: null,
            }
        };
    }

    // ==============================
    // Handlers
    // ==============================

    closeModal() {
        this.props.closeModalTableField();
    }

    handleFieldChange(name, value){
        this.props.changeTableField(name, value);
    }
    
    handleSubmit() {
        if(this.validate()) {
            this.props.saveTableField();
            this.closeModal();
        }
    }

    handleRemove() {
       
    }

    validate() {
        if(!this.props.table.form.identifier || !this.props.table.form.name || !this.props.table.form.format) {
            this.setState({
                errors: {
                    identifier: !this.props.table.form.identifier ? true : false,
                    name: !this.props.table.form.name ? true : false, 
                    format: !this.props.table.form.format ? true : false,
                }
            });
            return false;
        }

        // Reset state
        this.setState({
            errors: {
                identifier: null,
                name: null,
                format: null
            }
        });

        return true;
    }

    // ==============================
    // Getter
    // ==============================


    // ==============================
    // Renderers
    // ==============================
    render() {
        return (
            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={this.props.title}
                display={this.props.table.displayModal}
                zIndex={10000}
                size={this.props.size}
                onModalClose={this.closeModal.bind(this)}
                deleteButton={false}
                onCancel={() => this.closeModal}
                onSubmit={this.handleSubmit.bind(this)}
                onRemove={this.handleRemove.bind(this)}
            >
                <div className="row">
                    <div className="col-xs-12 field-col">

                        <InputField
                            label={'Identifier (champ)'}
                            value={this.props.table.form.identifier}
                            name={'identifier'}
                            onChange={this.handleFieldChange.bind(this)}
                            error={this.state.errors.identifier}
                        />

                        <InputField
                            label={'Name (lib)'}
                            value={this.props.table.form.name}
                            error={this.state.errors.name}
                            name={'name'}
                            onChange={this.handleFieldChange.bind(this)}
                        />
                        
                        <SelectField
                            label={'Format (Text, num, etc)'}
                            value={this.props.table.form.format !== null ? this.props.table.form.format : this.state.formats[0].value}
                            name={'format'}
                            arrayOfOptions={this.state.formats}
                            onChange={this.handleFieldChange.bind(this)}
                            error={this.state.errors.format}
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
        closeModalTableField: () => {return dispatch(closeModalTableField())},
        saveTableField: () => {return dispatch(saveTableField())},
        changeTableField: (name, value) => {return dispatch(changeTableField(name, value))},
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

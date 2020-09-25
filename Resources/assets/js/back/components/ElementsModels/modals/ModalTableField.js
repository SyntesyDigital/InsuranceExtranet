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
}, []);

class ModalTableField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formats: formats,
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
        this.props.saveTableField();
        this.closeModal();
    }

    handleRemove() {
       
    }

    // ==============================
    // Getter
    // ==============================
    getFieldValue(name) {
        return null;
    }
    
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
                        />

                        <InputField
                            label={'Name (lib)'}
                            value={this.props.table.form.name}
                            name={'name'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <SelectField
                            label={'Format (Text, num, etc)'}
                            value={this.props.table.form.format}
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

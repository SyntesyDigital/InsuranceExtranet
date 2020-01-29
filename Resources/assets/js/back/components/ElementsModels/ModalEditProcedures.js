import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Layout/Modal';
import InputField from '../Layout/Fields/InputField';
import SelectField from '../Layout/Fields/SelectField';
import ToggleField from '../Layout/Fields/ToggleField';
import InputFieldJsonEdit from '../Layout/Fields/InputFieldJsonEdit';
import FieldList from '../Layout/FieldList';
import FieldListItem from '../Layout/FieldListItem';
import BoxAddLarge from '../Layout/BoxAddLarge';
import ModalEditObject from './ModalEditObject';
import { connect } from 'react-redux';

import {
    closeModalProcedure,
    removeProcedure,
    updateProcedureField,
    openModalEditObject,
    openModalCreateObject,
    removeProcedureObject,
    updateSettings

} from './actions';


class ModalEditProcedures extends Component {

    constructor(props) {

        super(props);

        this.state = {
            
        };

        this.handleChangeRepeatable = this.handleChangeRepeatable.bind(this);

    }

    // ==============================
    // Handlers
    // ==============================

    handleCancel() {
        console.log("handleCancel Procedure");
        this.props.closeModalProcedure();
    }

    handleRemove() {
        console.log("handleRemove Procedure");
        this.props.removeProcedure(this.props.form.currentProcedure);
    }


    handleRemoveObject(procedure, object){
        console.log("handleRemoveObject", procedure, object);
        this.props.removeProcedureObject(procedure, object);
    }

    handleEditObject(procedure, object){
        console.log("handleEditObject", procedure, object);
        this.props.openModalEditObject(procedure, object);
    }
    
    handleModalCloseEditObject() {
        this.setState({
            displayEditObject: false,
            displayEditProcedures: true,
        });
    }
    
    handleCreateProcedureObject(){
        console.log("handleCreateProcedureObject");
        this.props.openModalCreateObject();
    }

    handleChangeRepeatable() {
        this.setState({
            checkedRepeatable: !this.state.checkedRepeatable
        })
    }

    handleFieldChange(name, value){
        const { currentProcedure } = this.props.form;
        this.props.updateProcedureField(currentProcedure, name, value);
        console.log("handleFieldChange", currentProcedure, name, value);
    }

    // ==============================
    // Renderers
    // ==============================

    renderObjects(currentProcedure) {
        if (currentProcedure === undefined)
            return null;

        const displayObjects = currentProcedure.objects.map((object, index) =>
            <div key={object.identifier + index} className={object.identifier + index}>
                <FieldListItem
                    key={index}
                    identifier={object.identifier}
                    index={index}
                    icon={object.icon}
                    label={object.format}
                    labelField={object.name}
                    isField={true}
                    onEdit={this.handleEditObject.bind(this, currentProcedure, object)}
                    onRemove={this.handleRemoveObject.bind(this, currentProcedure, object)}
                />
            </div>
        )
        return (
            <div>
                {displayObjects}
            </div>

        )

    }

    render() {

        const { currentProcedure } = this.props.form;

        const inputFieldJsonEdit = this.state.checkedRepeatable ? 
            <InputFieldJsonEdit 
                label={'JSON'} 
                data={currentProcedure.jsonPath}
            /> 
        : null;

        return (

            <Modal
                id={this.props.id}
                icon={this.props.icon}
                title={'Edit Procedures'}
                display={this.props.display}
                zIndex={10000}
                size={this.props.size}

                onModalClose={this.props.closeModalProcedure}
                onCancel={this.props.closeModalProcedure}
                onRemove={this.handleRemove.bind(this)}
            >
                {currentProcedure != null &&

                    <div className="row rightbar-page">

                        <div className="col-md-8 col-xs-12 field-col page-content form-fields">

                            <ModalEditObject
                                id={'modal-edit-object'}
                                icon={'fas fa-bars'}
                                size={'medium'}
                                title={'Object | Configuration'}
                                display={this.props.form.displayEditObject}
                                zIndex={10000}
                                onModalClose={this.handleModalCloseEditObject.bind(this)}
                            />

                            <FieldList>

                                {this.renderObjects(currentProcedure)}

                                <BoxAddLarge
                                    identifier='1'
                                    title='Ajouter'
                                    onClick={this.handleCreateProcedureObject.bind(this)}
                                />

                            </FieldList>

                        </div>

                        <div className="col-md-4 col-xs-12 field-col">

                            <InputField
                                label={'Name'}
                                name={'name'}
                                value={currentProcedure.name}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                     
                            <SelectField
                                label={'Service'}
                                value={currentProcedure.service}
                                name={'service'}
                                arrayOfOptions={currentProcedure.services}
                                onChange={this.handleFieldChange.bind(this)}
                                // onChange={this.handleFieldChange.bind(this)}
                            />
                            

                            <ToggleField
                                label={'Configurable'}
                                name={'configurable'}
                                checked={currentProcedure.configurable}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Required'}
                                name={'required'}
                                checked={currentProcedure.required}
                                onChange={this.handleFieldChange.bind(this)}
                            />

                            <ToggleField
                                label={'Repeatable'}
                                name={'repeatable'}
                                checked={this.state.checkedRepeatable}
                                onChange={this.handleChangeRepeatable}
                            />

                            {/* show input json edit when procedures is Repeatable */}
                            {inputFieldJsonEdit}

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

        //remove
        removeProcedure: (procedure) => {
            return dispatch(removeProcedure(procedure));
        },
        //move
        moveProcedure: () => {
            return dispatch(moveProcedure());
        },

        updateProcedureField: (procedure, name, value) => {
            return dispatch(updateProcedureField(procedure, name, value));
        },
            
        updateSettings: (procedure, value, index) => {
            return dispatch(updateSettings(procedure, value, index));
        },

        removeProcedureObject: (procedure, object) => {
            return dispatch(removeProcedureObject(procedure, object));
        },
    
        closeModalProcedure: () => {
            return dispatch(closeModalProcedure());
        },

        openModalEditObject: (procedure, object) => {
            return dispatch(openModalEditObject(procedure, object));
        },

        openModalCreateObject: (procedure) => {
            return dispatch(openModalCreateObject(procedure));
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProcedures);

ModalEditProcedures.propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    size: PropTypes.string.isRequired,

    onAddProcedureObject: PropTypes.func,
    onEditProcedureObject: PropTypes.func,
    // onRemoveProcedureObject: PropTypes.func,
    onMoveProcedureObject: PropTypes.func,
    // onUpdateProcedureField: PropTypes.func,
    onCloseModal: PropTypes.func,

    onCancel: PropTypes.func,
    onRemove: PropTypes.func
};


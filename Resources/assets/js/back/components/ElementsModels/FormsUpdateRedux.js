import React, { Component } from 'react';
import ButtonPrimary from '../Layout/ButtonPrimary';
import BarTitle from '../Layout/BarTitle';
import ButtonSecondary from '../Layout/ButtonSecondary';
import ButtonDropdown from '../Layout/ButtonDropdown';
import FieldList from '../Layout/FieldList';
import FieldListItem from '../Layout/FieldListItem';
import InputField from '../Layout/Fields/InputField';
import ModalTestForm from './ModalTestForm';
import ModalEditProcedures from './ModalEditProcedures';
import BoxAddLarge from '../Layout/BoxAddLarge';
import IconField from '../Layout/Fields/IconField';
import { connect } from 'react-redux';

import {
    initState,
    saveForm,
    removeForm,
    testForm,
    updateField,
    removeProcedure,
    openModalCreateProcedure,
    openModalEditProcedure,
    
} from './actions'



class FormsUpdateRedux extends Component {

    constructor(props) {

        super(props);

        this.state = {

        };

        this.props.initState(this.props.modelId);
    }

    // ==============================
    // Handlers
    // ==============================
    
    handleEditProcedure(procedure){
        console.log("handleEditProcedure", procedure);

        //clone the object not send the reference
        procedure = JSON.parse(JSON.stringify(procedure));

        this.props.openModalEditProcedure(procedure);
    }

    handleCreateProcedure(){
        console.log("handleCreateProcedure");
        this.props.openModalCreateProcedure(this.props.form.form.procedures);
    }

    handleRemoveProcedure(procedure){
        console.log("handleRemoveProcedure");
        this.props.removeProcedure(
            this.props.form.form.procedures, 
            procedure
        );
    }

    handleTestForm(form){
        console.log("handleTestForm");
        this.props.testForm(form);
    }

    handleRemoveForm(form) {

        var _this = this;

        bootbox.confirm({
            message: this.props.rempoveMessage !== undefined ? 
            this.props.rempoveMessage : Lang.get('fields.delete_row_alert'),
            buttons: {
                confirm: {
                    label: Lang.get('fields.si') ,
                    className: 'btn-primary'
                },
                cancel: {
                    label:  Lang.get('fields.no'),
                    className: 'btn-default'
                }
            },
            callback: function (result) {
                if(result){
                    console.log("handleRemoveForm");
                    _this.props.removeForm(_this.props.form.form);
                }
              }
            });
    }

    handleSubmit() {
        console.log("handleSubmit");
        this.props.saveForm(this.props.form.form);
    }

    // ==============================
    // Renderers
    // ==============================

    renderProcedures() {
        
        const displayProcedures = this.props.form.form.procedures.map((procedure, index) =>
            <div key={procedure.name+index} className={procedure.name+index}>
                <FieldListItem
                    key={index}
                    identifier={procedure.id}
                    index={index}
                    icon={'fas fa-bars'}
                    icons={[
                        'fas fa-redo-alt'
                    ]}
                    labelInputLeft={procedure.name}
                    labelInputRight={procedure.service}
                    
                    //onEvents
                    onEdit={this.handleEditProcedure.bind(this, procedure)}
                    onRemove={this.handleRemoveProcedure.bind(this, procedure)}
                />
            </div>
        )
        return (
            <div>
                {displayProcedures}
            </div>
        )
    }

    render() {

        const saved = this.props.form.form.id == null ? false : true;

        return (

            <div className="forms-update">

                <ModalTestForm
                    id={'modal-test-form'}
                    icon={'fas fa-bars'}
                    size={'medium'}
                    title={'Test Json'}
                    display={this.props.form.displayTestForm}
                    zIndex={10000}
                    // onModalClose={this.handleModalClose.bind(this)}
                />

                <ModalEditProcedures
                    id={'modal-edit-procedures'}
                    icon={'fas fa-bars'}
                    size={'medium-large'}
                    title={'Test Json'}
                    display={this.props.form.displayEditProcedures}
                    procedure={this.props.form.currentProcedure}
                    zIndex={10000}
                    
                />

                <BarTitle
                    icon={this.props.form.form.icon}
                    title={this.props.form.form.name}
                    backRoute={routes['extranet.elements-models.forms.index']}
                >
                    {saved && 
                        <ButtonSecondary
                            label={'Test form'}
                            icon={'fas fa-sync-alt'}
                            onClick={this.handleTestForm.bind(this)}
                        />
                    }

                    <ButtonDropdown
                        label={'Actions'}
                        list={[
                            {
                                label: 'Nouveau',
                                icon: 'fa fa-plus-circle',
                                route: routes['extranet.elements-models.forms.create'],

                            },
                            {
                                label: 'Supprimier',
                                icon: 'fas fa-trash-alt',
                                className: 'text-danger',
                                onClick: this.handleRemoveForm.bind(this),
                            }
                        ]}
                    />

                    <ButtonPrimary
                        label={'Sauvegarder'}
                        icon={'fa fa-save'}
                        onClick={this.handleSubmit.bind(this)}
                    />

                </BarTitle>

                <div className="container rightbar-page">

                    <div className="col-md-9 page-content form-fields" style={{
                            opacity : saved ? 1 : 0.5,
                            pointerEvents : saved ? 'auto' : 'none'
                        }}>

                        <FieldList>

                            {this.renderProcedures()}

                            <BoxAddLarge
                                title='Ajouter'
                                onClick={this.handleCreateProcedure.bind(this)}
                            />

                        </FieldList>

                    </div>

                    <div className="sidebar">

                        <InputField
                            label={'Name'}
                            value={this.props.form.form.name}
                            name={'name'}
                            onChange={this.props.updateField}
                        />
                        
                        <InputField
                            label={'Identifier'}
                            value={this.props.form.form.identifier}
                            name={'identifier'}
                            onChange={this.props.updateField}
                        />

                        <IconField
                            label={'Icone'}
                            name={'icon'}
                            value={this.props.form.form.icon}
                            onChange={this.props.updateField}
                        />

                        <InputField
                            label={'Description'}
                            value={this.props.form.form.description}
                            name={'description'}
                            onChange={this.props.updateField}
                        />

                        

                    </div>
                </div>
            </div>
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

        // ==============================
        // Initial State
        // ==============================

        initState: (modelId) => {
            return dispatch(initState(modelId));
        },

        // ==============================
        // Form
        // ==============================

        updateField: (name, value) => {
            return dispatch(updateField(name, value));
        },

        saveForm: (form) => {
            return dispatch(saveForm(form));
        },

        removeForm: (form) => {
            return dispatch(removeForm(form));
        },

        testForm: (form) => {
            return dispatch(testForm(form));
        },

        duplicateForm: (form) => {
            return dispatch(duplicateForm(form));
        },

        // ==============================
        // Procedures
        // ==============================

        removeProcedure:(procedures,procedure) => {
            return dispatch(removeProcedure(procedures,procedure));
        },
        
        openModalCreateProcedure: (procedures) => {
            return dispatch(openModalCreateProcedure(procedures));
        },

        openModalEditProcedure: (procedure) => {
            return dispatch(openModalEditProcedure(procedure));
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormsUpdateRedux);

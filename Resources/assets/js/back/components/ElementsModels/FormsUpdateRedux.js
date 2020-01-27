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
    loadForm,
    saveForm,
    createForm,
    updateForm,
    removeForm,
    updateField,
    openModalCreateProcedure,
    openModalEditProcedure,
    
} from './actions'



class FormsUpdateRedux extends Component {

    constructor(props) {

        super(props);

        this.state = {

        };

        this.props.initState();
    }

    // ==============================
    // Handlers
    // ==============================
    
    handleEditProcedure(procedure){
        console.log("handleEditProcedure", procedure);
        this.props.openModalEditProcedure(procedure);
    }

    handleCreateProcedure(){
        console.log("handleCreateProcedure");
        this.props.openModalEditProcedure();
    }

    handleRemoveProcedure(procedure){
        console.log("handleRemoveProcedure", procedure);
    }

    handleModalClose() {
        this.setState({
            displayEditObject: false,
            displayTestForm: false,
        });
    }

    handleModalCloseEditProcedure() {
        this.setState({
            displayEditProcedures: false,
            currentProcedure: null
        });
    }

    handleRemoveForm(form) {
        console.log("handleRemoveForm");
        this.props.removeForm(this.props.form.form);
    }

    handleSubmit() {
        console.log("handleSubmitForm");
    }

    // ==============================
    // Renderers
    // ==============================

    renderProcedures() {
        const displayProcedures = this.props.form.form.procedure.map((procedure, index) =>
            <div key={procedure.title + index} className={procedure.title + index}>
                <FieldListItem
                    key={index}
                    identifier={procedure.id}
                    index={index}
                    icon={'fas fa-bars'}
                    icons={[
                        'fas fa-redo-alt'
                    ]}
                    labelInputLeft={procedure.title}
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

        return (

            <div className="forms-update">

                <ModalTestForm
                    id={'modal-test-form'}
                    icon={'fas fa-bars'}
                    size={'medium'}
                    title={'Test Json'}
                    display={this.props.form.displayTestForm}
                    zIndex={10000}
                    onModalClose={this.handleModalClose.bind(this)}
                />

                <ModalEditProcedures
                    id={'modal-edit-procedures'}
                    icon={'fas fa-bars'}
                    size={'medium-large'}
                    title={'Test Json'}
                    display={this.props.form.displayEditProcedures}
                    zIndex={10000}
                    onModalClose={this.handleModalCloseEditProcedure.bind(this)}
                />

                <BarTitle
                    icon={this.props.form.form.icon}
                    title={this.props.form.form.name}
                    backRoute={routes['extranet.elements-models.forms.index']}
                >
                    <ButtonSecondary
                        label={'Test form'}
                        icon={'fas fa-sync-alt'}
                        // onClick={this.openModalTestForm.bind(this)}
                    />

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

                    <div className="col-md-9 page-content form-fields">

                        <FieldList>

                            {this.renderProcedures()}

                        </FieldList>

                        <BoxAddLarge
                            identifier='1'
                            title='Ajouter'
                            onClick={this.handleCreateProcedure.bind(this)}
                        />

                    </div>

                    <div className="sidebar">

                        <InputField
                            label={'Identifier'}
                            value={this.props.form.form.identifier}
                            name={'identifier'}
                            onChange={this.props.updateField}
                        />

                        <InputField
                            label={'Name'}
                            value={this.props.form.form.name}
                            name={'name'}
                            onChange={this.props.updateField}
                        />

                        <InputField
                            label={'Description'}
                            value={this.props.form.form.description}
                            name={'description'}
                            onChange={this.props.updateField}
                        />

                        <IconField
                            label={'Icone'}
                            name={'icon'}
                            value={this.props.form.form.icon}
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

        initState: () => {
            return dispatch(initState());
        },

        updateField: (name, value) => {
            return dispatch(updateField(name, value));
        },

        loadForm: (formId) => {
            return dispatch(loadForm(formId));
        },

        saveForm: (form) => {
            return dispatch(saveForm(form));
        },

        createForm: (form) => {
            return dispatch(createForm(form));
        },

        updateForm: (form) => {
            return dispatch(updateForm(form));
        },

        removeForm: (form) => {
            return dispatch(removeForm(form));
        },

        duplicateForm: (form) => {
            return dispatch(duplicateForm(form));
        },

        // ==============================
        // Procedures
        // ==============================

        openModalCreateProcedure: () => {
            return dispatch(openModalCreateProcedure());
        },

        openModalEditProcedure: (procedure) => {
            return dispatch(openModalEditProcedure(procedure));
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormsUpdateRedux);

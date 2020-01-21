import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonPrimary from '../Layout/ButtonPrimary';
import BarTitle from '../Layout/BarTitle';
import ButtonSecondary from '../Layout/ButtonSecondary';
import ButtonDropdown from '../Layout/ButtonDropdown';
import FieldList from '../Layout/FieldList';
import FieldListItem from '../Layout/FieldListItem';
import InputField from '../Layout/Fields/InputField';
import ModalTestForm from './ModalTestForm';
import ModalEditProcedures from './ModalEditProcedures';
import ModalEditObject from './ModalEditObject';
import BoxAddLarge from '../Layout/BoxAddLarge';
import IconField from '../Layout/Fields/IconField';




export default class FormsUpdate extends Component {

    constructor(props) {

        super(props);

        this.state = {

            displayEditObject: false,
            displayEditProcedures: false,
            displayTestForm: false,
            currentProcedure: null,

            form:
            {
                id: 1,
                modele: 'CSRIN',
                name: 'Formulario 01',
                identifier: 'Identifier',
                description: 'Description',
                icon: 'fas fa-list-ul',
                objectId: 'SIN02',
                etap: '101',
                lib: 'Assuré',
                rep: 'N',
                conf: 'Y',
                obl: 'Y',
                p1: null,
                P2: null,
                p3: null,
                procedure: [
                    {
                        id: 1,
                        title: 'Procedure 01',
                        service: 'service-01',
                        services: [
                            {
                                name: 'service-01',
                                value: 'Service-01'
                            },
                            {
                                name: 'service-02',
                                value: 'Service-02'
                            },
                            {
                                name: 'service-03',
                                value: 'Service-03'
                            },
                        ],
                        configurable: {
                            name: 'configurable',
                            value: true
                        },
                        required: {
                            name: 'required',
                            value: true
                        },
                        repeatable: {
                            name: 'required',
                            value: true
                        },
                        objects: [
                            {
                                identifier: 1,
                                name: 'Name',
                                typeNature: [
                                    {
                                        name: 'cte',
                                        value: 'CTE'
                                    },
                                    {
                                        name: 'system',
                                        value: 'SYSTEM'
                                    },
                                    {
                                        name: 'input',
                                        value: 'INPUT'
                                    },
                                ],
                                format: [
                                    {
                                        name: 'text',
                                        value: 'TEXT'
                                    },
                                    {
                                        name: 'num',
                                        value: 'Num'
                                    },
                                ],
                                defaultValue: {
                                    name: 'default-value',
                                    value: 'Valeur'
                                },
                                boby: {
                                    name: 'boby',
                                    value: 'Boby'
                                },
                                jsonPath: {
                                    name: 'json-path',
                                    value: 'JSON path'
                                },
                                example: {
                                    name: 'example',
                                    value: 'Example'
                                },
                                configurable: {
                                    name: 'configurable',
                                    value: true
                                },
                                visible: {
                                    name: 'visible',
                                    value: true
                                }
                            }
                        ]
                        

                    },
                    {
                        id: 2,
                        title: 'Procedure 02',
                        service: 'service-01',
                        services: [
                            {
                                name: 'service-01',
                                value: 'Service-01'
                            },
                            {
                                name: 'service-02',
                                value: 'Service-02'
                            },
                            {
                                name: 'service-03',
                                value: 'Service-03'
                            },
                        ],
                        configurable: {
                            name: 'configurable',
                            value: true
                        },
                        required: {
                            name: 'required',
                            value: true
                        },
                        repeatable: {
                            name: 'required',
                            value: true
                        },
                        objects: [
                            {
                                identifier: 2,
                                name: 'Name',
                                typeNature: [
                                    {
                                        name: 'cte',
                                        value: 'CTE'
                                    },
                                    {
                                        name: 'system',
                                        value: 'SYSTEM'
                                    },
                                    {
                                        name: 'input',
                                        value: 'INPUT'
                                    },
                                ],
                                format: [
                                    {
                                        name: 'text',
                                        value: 'TEXT'
                                    },
                                    {
                                        name: 'num',
                                        value: 'Num'
                                    },
                                ],
                                defaultValue: {
                                    name: 'default-value',
                                    value: 'Valeur'
                                },
                                boby: {
                                    name: 'boby',
                                    value: 'Boby'
                                },
                                jsonPath: {
                                    name: 'json-path',
                                    value: 'JSON path'
                                },
                                example: {
                                    name: 'example',
                                    value: 'Example'
                                },
                                configurable: {
                                    name: 'configurable',
                                    value: true
                                },
                                visible: {
                                    name: 'visible',
                                    value: true
                                }
                            }
                        
                        ]
                    }
                ]
            }
        };
    }

    // ==============================
    // Open Modals
    // ==============================

    openModalEditProcedures(currentProcedure, e) {
        console.log('openModalEditProcedures -> ',currentProcedure);
        if (e !== undefined) {
            e.preventDefault();
        }
        this.setState({
            displayEditProcedures: true,
            currentProcedure: currentProcedure
        });
    }

    openModalEditObject(e, object) {
        if (e !== undefined) {
            e.preventDefault();
        }

        this.setState({
            displayEditObject: true,
        });
    }

    openModalTestForm(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        this.setState({
            displayTestForm: true,
        });
    }

    // ==============================
    // Handlers
    // ==============================

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

    handleFieldChange(name, value) {
        console.log("handleFieldChange :: (name,value) ", name, value);
        const { form } = this.state;
        form[name] = value;
        this.setState({
            form: form
        });
    }

    handleRemove() {
        console.log("handleRemoveForm");
    }

    handleSubmit() {
        console.log("handleSubmitForm");
    }

    // ==============================
    // Renderers
    // ==============================

    renderProcedures() {
        const displayProcedures = this.state.form.procedure.map((procedure, index) =>
            <div key={procedure.title + index} className={procedure.title + index}>
                <FieldListItem
                    key={index}
                    identifier={procedure.id}
                    index={index}
                    onClick={this.openModalEditProcedures.bind(this, procedure)}
                    icon={'fas fa-bars'}
                    icons={[
                        'fas fa-redo-alt'
                    ]}
                    labelInputLeft={procedure.title}
                    labelInputRight={procedure.service}  
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
                    display={this.state.displayTestForm}
                    zIndex={10000}
                    onModalClose={this.handleModalClose.bind(this)}
                />

                <ModalEditProcedures
                    id={'modal-edit-procedures'}
                    icon={'fas fa-bars'}
                    size={'medium-large'}
                    title={'Test Json'}
                    display={this.state.displayEditProcedures}
                    zIndex={10000}
                    onModalClose={this.handleModalCloseEditProcedure.bind(this)}
                    procedure={this.state.currentProcedure}
                />

                <ModalEditObject
                    id={'modal-edit-object'}
                    icon={'fas fa-bars'}
                    size={'medium'}
                    title={'Object | Configuration'}
                    display={this.state.displayEditObject}
                    zIndex={10000}
                    onModalClose={this.handleModalClose.bind(this)}
                />

                <BarTitle
                    icon={this.state.form.icon}
                    title={this.state.form.name}
                    backRoute={routes['extranet.elements-models.forms.index']}
                >
                    <ButtonSecondary
                        label={'Test form'}
                        icon={'fas fa-sync-alt'}
                        onClick={this.openModalTestForm.bind(this)}
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
                                onClick: this.handleRemove.bind(this),
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
                            onClick={this.openModalEditProcedures.bind(this)}
                        />

                    </div>

                    <div className="sidebar">

                        <InputField
                            label={'Identifier'}
                            value={this.state.form.identifier}
                            name={'identifier'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <InputField
                            label={'Name'}
                            value={this.state.form.name}
                            name={'name'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <InputField
                            label={'Description'}
                            value={this.state.form.description}
                            name={'description'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <IconField
                            label={'Icone'}
                            name={'icon'}
                            value={this.state.form.icon}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('elements-models-forms-update')) {
    ReactDOM.render(<FormsUpdate />, document.getElementById('elements-models-forms-update'));
}

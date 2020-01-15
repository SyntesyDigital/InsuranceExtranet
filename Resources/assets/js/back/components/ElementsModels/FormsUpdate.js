import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonPrimary from '../Layout/ButtonPrimary';
import BarTitle from '../Layout/BarTitle';
import ButtonSecondary from '../Layout/ButtonSecondary';
import ButtonDropdown from '../Layout/ButtonDropdown';
import FieldList from '../Layout/FieldList';
import FieldListItem from '../Layout/FieldListItem';
import SelectField from '../Layout/Fields/SelectField';
import InputField from '../Layout/Fields/InputField';
import ModalTestForm from './ModalTestForm';
import ModalEditProcedures from './ModalEditProcedures';
import ModalEditObject from './ModalEditObject';
import BoxAddLarge from '../Layout/BoxAddLarge';

const arrayOfGroup = [
    {
        id: '1 - Nico',
        name: 'nico'
    },
    {
        id: '2 - Sergi',
        name: 'sergi'
    },
    {
        id: '3 - Francicso',
        name: 'francisco'
    },
    {
        id: '4 - dani',
        name: 'dani'
    },
];

export default class FormsUpdate extends Component {

    constructor(props) {

        super(props);

        this.state = {

            displayEditObject: false,
            displayEditProcedures: false,
            displayTestForm: false,
            selectedValue: 'Nothing selected'

        };
    }

    openModalEditProcedures(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        this.setState({
            displayEditProcedures: true,
        });
    }

    openModalEditObject(e) {
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


    handleModalClose() {
        this.setState({
            displayEditObject: false,
            displayEditProcedures: false,
            displayTestForm: false
        });
    }

    handleSelectChange(selectedValue) {
        this.setState({
            selectedValue: selectedValue
        });
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
                    onModalClose={this.handleModalClose.bind(this)}
                />

                <ModalEditObject
                    id={'modal-edit-object'}
                    icon={'fas fa-bars'}
                    size={'medium'}
                    title={'Test Json'}
                    display={this.state.displayEditObject}
                    zIndex={10000}
                    onModalClose={this.handleModalClose.bind(this)}
                />

                <BarTitle
                    icon={'fas fa-list-ul'}
                    title={'Formularie Name'}
                    backRoute={'#'}
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
                                route: '/architect/contents/page/create',
                                className: ''
                            },
                            {
                                label: 'Supprimier',
                                icon: 'fas fa-trash-alt',
                                route: '/architect/contents/page/create',
                                className: 'text-danger'
                            }
                        ]}
                    />

                    <ButtonPrimary
                        label={'Sauvegarder'}
                        icon={'fa fa-save'}
                    />

                </BarTitle>

                <div className="container rightbar-page">

                    <div className="col-md-9 page-content form-fields">

                        <FieldList>

                            <FieldListItem
                                icon={'fas fa-bars'}
                                label={''}
                                identifier={'id'}
                                icons={[
                                    'fas fa-redo-alt'
                                ]}
                                onClick={this.openModalEditObject.bind(this)}
                            >
                                <div className="row">
                                    <div className="col col-xs-6 text-left">
                                        Name
                                    </div>
                                    <div className="col col-xs-6 text-left">
                                        Service
                                    </div>
                                </div>
                            </FieldListItem>

                        </FieldList>

                        <BoxAddLarge
                            identifier='1'
                            title='Ajouter'
                            onClick={this.openModalEditProcedures.bind(this)}
                        />

                    </div>

                    <div className="sidebar">

                        <InputField
                            title={'nd'}
                            value={''}
                            name={'nd'}
                        />

                        <InputField
                            title={'Name'}
                            value={''}
                            name={'nom'}
                        />

                        <InputField
                            title={'Description'}
                            value={''}
                            name={'description'}
                        />

                        <SelectField
                            arrayOfGroup={arrayOfGroup}
                            title={'Icone'}
                            onSelectChange={this.handleSelectChange.bind(this)}
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

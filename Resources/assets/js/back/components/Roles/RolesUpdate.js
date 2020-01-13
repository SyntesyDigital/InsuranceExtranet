import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import ButtonSecondary from '../Layout/ButtonSecondary';
import CollapsableGroup from '../Layout/CollapsableGroup';
import BoxAddGroup from '../Layout/BoxAddGroup';
import Switch from '../Layout/Fields/ToggleField';
import SidebarTitle from '../Layout/SidebarTitle';
import ModalEditPermision from '../Roles/ModalEditPermision';
import ModalEditGroup from '../Roles/ModalEditGroup';
import Checkbox from '../Layout/CheckBox';
import InputField from '../Layout/Fields/InputField';

export default class RolesUpdate extends Component {

    constructor(props) {

        super(props);

        this.state = {

            displayGroup: false,
            displayPermision: false

        };
    }

    openModalEditGroup(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        this.setState({
            displayGroup: true,
        });
    }

    openModalEditPermision(e) {
        if (e !== undefined) {
            e.preventDefault();
        }

        this.setState({
            displayPermision: true,
        });
    }


    handleModalClose() {
        this.setState({
            displayGroup: false,
            displayPermision: false
        });
    }

    render() {

        return (

            <div className="roles-update">

                <ModalEditPermision
                    id={'modal-edit-permision'}
                    icon={'fas fa-bars'}
                    size={'medium'}
                    title={'Permision | Edit'}
                    display={this.state.displayPermision}
                    zIndex={10000}
                    onModalClose={this.handleModalClose.bind(this)}
                >
                </ModalEditPermision>

                <ModalEditGroup
                    id={'modal-edit-group'}
                    icon={'fas fa-bars'}
                    size={'medium'}
                    title={'Group | Edit'}
                    display={this.state.displayGroup}
                    zIndex={10000}
                    onModalClose={this.handleModalClose.bind(this)}
                >
                </ModalEditGroup>

                <BarTitle
                    icon={'fa fa-file'}
                    title={'Admin'}
                    backRoute={'#'}
                >
                    <ButtonSecondary
                        label={'Add permission'}
                        icon={'fa fa-plus'}
                        onClick={this.openModalEditPermision.bind(this)}
                    />

                    <ButtonSecondary
                        label={'Actions'}
                        icon={'fa fa-plus'}
                    />

                    <ButtonPrimary
                        label={'Sauvegarder'}
                        icon={'fa fa-save'}
                    />

                </BarTitle>

                <div className="container rightbar-page">

                    <div className="col-md-9 page-content form-fields">

                        <CollapsableGroup
                            identifier='1'
                            title='CMS '
                            iconHovered='far fa-edit'
                            iconDefault='fas fa-arrow-down'
                            isEdit={true}
                            onClick={this.openModalEditGroup.bind(this)}

                        >

                            <div className="col-md-4">
                                <div className="container-checkbox">
                                    <Checkbox
                                        title={'Permiso 1'}
                                        iconEdit={'far fa-edit'}
                                        isEdit={true}
                                        onClick={this.openModalEditPermision.bind(this)}
                                    />
                                </div>
                            </div>

                        </CollapsableGroup>

                        <CollapsableGroup
                            identifier='2'
                            title='Front '
                            iconHovered='far fa-edit'
                            iconDefault='fas fa-arrow-down'
                            isEdit={true}
                            onClick={this.openModalEditGroup.bind(this)}
                        >
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 2'}
                                    iconEdit={'far fa-edit'}
                                    isEdit={true}
                                    onClick={this.openModalEditGroup.bind(this)}
                                />
                            </div>
                        </CollapsableGroup>

                        <CollapsableGroup
                            identifier='3'
                            title='Sinisters '
                            iconHovered='far fa-edit'
                            iconDefault='fas fa-arrow-up'
                            isEdit={true}
                            onClick={this.openModalEditGroup.bind(this)}
                        >
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 2'}
                                    iconEdit={'far fa-edit'}
                                    isEdit={true}
                                    onClick={this.openModalEditGroup.bind(this)}
                                />
                            </div>
                        </CollapsableGroup>

                        <BoxAddGroup
                            identifier='1'
                            title='Add group'
                            onClick={this.openModalEditGroup.bind(this)}
                        />


                    </div>
                    <div className="sidebar">
                        <SidebarTitle
                            title="Settings"
                        />

                        <InputField
                            title={'Name'}
                            value={''}
                            name={'name'}

                        />

                        <InputField
                            title={'Identifier'}
                            value={''}
                            name={'identifier'}

                        />

                        <InputField
                            title={'Icon'}
                            value={''}
                            name={'icon'}

                        />

                        <Switch
                            title={'Default'}
                        />
                    </div>
                </div>
            </div>
        );
    }


}

if (document.getElementById('roles-update')) {
    ReactDOM.render(<RolesUpdate />, document.getElementById('roles-update'));
}



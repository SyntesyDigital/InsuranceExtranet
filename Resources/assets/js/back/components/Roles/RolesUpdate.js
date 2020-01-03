import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import ButtonSecondary from '../Layout/ButtonSecondary';
import CollapsableGroup from '../Layout/CollapsableGroup';
import BoxAddGroup from '../Layout/BoxAddGroup';
import Switch from '../Layout/ToggleSwitch';
import SidebarTitle from '../Layout/SidebarTitle';
import ModalEditPermision from '../Roles/ModalEditPermision';
import ModalEditGroup from '../Roles/ModalEditGroup';
import Checkbox from '../Layout/CheckBox';

export default class RolesUpdate extends Component {

    constructor(props) {

        super(props);

        this.state = {

            displayGroup: false,
            displayPermision: false
            
        };

    }

    openModal(e) {
        if (e !== undefined) {
            e.preventDefault();
        }

        this.setState({
            displayGroup: true,
            displayPermision: true
        });
    }

    handleModalClose() {
        this.setState({
            displayGroup: false,
            displayPermision: false
        });
    }

    handleClick(e){
        e.preventDefault();
        this.setState({
            displayGroup: true,
            displayPermision: true
        })
    }



    render() {

        return (

            <div className="roles-update">

                <ModalEditPermision
                    id={'modal-edit-permision'}
                    icon={'fas fa-bars'}
                    title={'Permision | Edit'}
                    display={this.state.displayPermision}
                    zIndex={10000}
                    onModalClose={this.handleModalClose.bind(this)}
                >
                </ModalEditPermision>

                <ModalEditGroup
                    id={'modal-edit-permision'}
                    icon={'fas fa-bars'}
                    title={'Permision | Edit'}
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
                        onClick={this.openModal.bind(this)}
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
                            icon='far fa-edit'
                            onClick={this.handleClick.bind(this)}
                        >

                            <div className="col-md-4">
                                <div className="container-checkbox">
                                    <Checkbox
                                        title={'Permiso 1'}
                                        onClick={this.handleClick.bind(this)}
                                    />
                                </div>
                            </div>

                        </CollapsableGroup>

                        <CollapsableGroup
                            identifier='2'
                            title='Front '
                            icon='far fa-edit'
                        >
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 2'}
                                    onClick={this.handleClick.bind(this)}
                                />
                            </div>
                        </CollapsableGroup>

                        <CollapsableGroup
                            identifier='3'
                            title='Sinisters '
                            icon='far fa-edit'
                        >
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 2'}
                                    onClick={this.handleClick.bind(this)}
                                />
                            </div>
                        </CollapsableGroup>

                        <BoxAddGroup
                            identifier='1'
                            title='Add group'
                            onClick={this.handleClick.bind(this)}
                        ></BoxAddGroup>


                    </div>
                    <div className="sidebar">
                        <SidebarTitle
                            title="Settings"
                        />
                        <div className="form-group bmd-form-group">
                            <label className="bmd-label-floating">Name</label>
                            <input className="form-control input-source" name="name" type="text"></input>
                        </div>
                        <div className="form-group bmd-form-group">
                            <label className="bmd-label-floating">Identifier</label>
                            <input className="form-control input-source" name="identifier" type="text"></input>
                        </div>
                        <div className="form-group bmd-form-group">
                            <label className="bmd-label-floating">Icon</label>
                            <input className="form-control input-source" name="icon" type="text"></input>
                        </div>
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


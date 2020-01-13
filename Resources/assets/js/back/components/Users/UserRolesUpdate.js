import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonPrimary from '../Layout/ButtonPrimary';
import BarTitle from '../Layout/BarTitle';
import CollapsableGroup from '../Layout/CollapsableGroup';
import Checkbox from '../Layout/CheckBox';
import Switch from '../Layout/Fields/ToggleField';


export default class UserRolesUpdate extends Component {
    render() {
        return (
            <div className="roles-update">
                <BarTitle
                    icon={'fa fa-file'}
                    title={'Admin'}
                    backRoute={'#'}
                >

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
                        >
                            <div className="col-md-4">
                                <div className="container-checkbox">
                                    <Checkbox
                                        title={'Permiso 1'}
                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 2'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 3'}
                                />
                            </div>
                        </CollapsableGroup>

                        <CollapsableGroup
                            identifier='2'
                            title='Front '
                        >
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 2'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 2'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 2'}
                                />
                            </div>
                        </CollapsableGroup>

                        <CollapsableGroup
                            identifier='3'
                            title='VEOS Sync '
                        >
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 2'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 2'}
                                />
                            </div>
                            <div className="col-md-4">
                                <Checkbox
                                    title={'Permiso 2'}
                                />
                            </div>
                        </CollapsableGroup>
                    </div>

                    <div className="sidebar">
                        <Switch
                            title={'Permiso 1'}
                        />
                        <Switch
                            title={'Permiso 1'}
                        />
                        <Switch
                            title={'Permiso 1'}
                        />
                        <Switch
                            title={'Permiso 1'}
                        />
                        <Switch
                            title={'Permiso 1'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('roles-users-update')) {
    ReactDOM.render(<UserRolesUpdate />, document.getElementById('roles-users-update'));
}

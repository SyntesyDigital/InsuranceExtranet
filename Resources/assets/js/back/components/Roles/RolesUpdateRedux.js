import React, { Component } from 'react';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import ButtonSecondary from '../Layout/ButtonSecondary';
import CollapsableGroup from '../Layout/CollapsableGroup';
import BoxAddGroup from '../Layout/BoxAddGroup';
import ToggleField from '../Layout/Fields/ToggleField';
import ModalEditPermision from '../Roles/ModalEditPermision';
import ModalEditGroup from '../Roles/ModalEditGroup';
import Checkbox from '../Layout/Fields/CheckField';
import InputField from '../Layout/Fields/InputField';
import ButtonDropdown from '../Layout/ButtonDropdown';
import IconField from '../Layout/Fields/IconField';
import BoxInputAdd from '../Layout/BoxInputAdd';
import { connect } from 'react-redux';

import {
    initState,
    submitRole,
    updateField,
    openModalEditGroup,
    openModalEditPermission,
    openModalCreateGroup,
    removeGroup,
    updatePermission,
    openModalCreatePermission,
    openModalPermissionFromGroup,
    reload
} from './actions'

class RolesUpdateRedux extends Component {

    constructor(props) {

        super(props);

        this.state = {

            displayGroup: false,
            displayPermision: false

        };

        this.props.initState(this.props.roleId);
    }

    componentDidUpdate(prevProps, prevState) { 
        if(!prevProps.form.groupsReload && this.props.form.groupsReload) {
            this.props.reload(this.props.form.role.id);
        }
    }

    /*
    *   Modal to edit Permission :
    *   IF create  general button : permission and group = null  
    *   If create but into a group : premission : null, group : selected group   
    *   If edit, premission and group selected.
    */

    openModalEditPermision(permission, group, e) {
        if (e !== undefined) {
            e.preventDefault();
        }

        this.props.openModalPermissionFromGroup(group);
    }


    // ==============================
    // Handlers
    // ==============================

    handleEditGroup(group) {
        this.props.openModalEditGroup(group);
    }

    handleEditPermission(permission) {
        this.props.openModalEditPermission(permission);
    }

    handleModalClose() {
        this.setState({
            displayGroup: false,
            displayPermision: false,
            selectedGroup: null,
            selectedPermission: null
        });
    }

    handleDuplicate() {
        console.log("handleDuplicate");
    }

    handleRemove() {
        console.log("handleRemoveRole");
    }

    handleSubmit() {
        console.log("handleSubmit");
        this.props.submitRole(this.props.form.role);
    }

    handlePermissionChange(permission, group, e) {
        console.log("handlePermissionChange :: (value,permission)", e.target.checked, permission);
        this.props.updatePermission(
            this.props.form.role,
            permission,
            e.target.checked
        );
    }

    handleAddGroup(e) {
        e.preventDefault();
        this.props.openModalCreateGroup();
    }

    handleRemoveGroup(group, e) {
        console.log("handleRemoveGroup :: (group)", group);
        this.props.removeGroup(group);
    }

    handleUpGroup(group, e) {
        console.log("handleUpGroup :: (group)", group);
    }

    handleDownGroup(group, e) {
        console.log("handleDownGroup :: (group)", group);
    }

    // ==============================
    // Renderers
    // ==============================

    renderGroups() {
        return this.props.form.role.groups.map((item, index) =>
            <CollapsableGroup
                key={item.id}
                identifier={item.identifier}
                title={item.name}
                icon=''
                editable={true}
                sortable={false}
                index={index}
                length={this.props.form.role.groups.length}

                //onEvents
                onEdit={this.handleEditGroup.bind(this, item)}
                onRemove={this.handleRemoveGroup.bind(this, item)}
                //onUp={this.handleUpGroup.bind(this, item)}
                //onDown={this.handleDownGroup.bind(this, item)}
            >
                {this.renderPermissions(item.permissions)}

                <div className="col-md-4">
                    <BoxInputAdd
                        onClick={this.handleEditPermission.bind(this, null, item)}
                    />
                </div>

            </CollapsableGroup>
        );
    }
    
    renderPermissions(permissions, group) {
        if (permissions === undefined)
            return null;

        return permissions.map((item, index) =>
            <div className="col-md-4">
                <div className="container-checkbox">
                    <Checkbox
                        key={item.id}
                        title={item.name}
                        iconEdit={'far fa-edit'}
                        isEdit={true}
                        disabled={this.props.form.role.id == null}
                        value={item.value}
                        onChange={this.handlePermissionChange.bind(this, item, group)}
                        onEdit={this.handleEditPermission.bind(this, item)}
                    />
                </div>
            </div>
        );
    }

    render() {

        return (

            <div className="roles-update">

                <ModalEditPermision
                    id={'modal-edit-permision'}
                    icon={'fas fa-bars'}
                    title={'Permision | Edit'}
                    zIndex={10000}
                    onModalClose={this.handleModalClose.bind(this)}
                >
                </ModalEditPermision>

                <ModalEditGroup
                    id={'modal-edit-group'}
                    icon={'fas fa-bars'}
                    size={'small'}
                    title={'Group | Edit'}
                    group={this.props.form.currentGroup}
                    zIndex={10000}
                >
                </ModalEditGroup>

                <BarTitle
                    icon={this.props.form.role.icon}
                    title={this.props.form.role.name}
                    backRoute={routes['extranet.roles.index']}
                >
                    {/*
                    //Removed to simplify the interaction. Avoiding to add permission if no group created, or 
                    //to create with no selected group
                    <ButtonSecondary
                        label={'Add permission'}
                        icon={'fa fa-plus-circle'}
                        onClick={this.props.openModalCreatePermission}
                    />
                    */}

                    <ButtonDropdown
                        label={'Actions'}
                        list={[
                            {
                                label: 'Nouveau',
                                icon: 'fa fa-plus-circle',
                                route: routes['extranet.roles.create'],
                                className: ''
                            },
                            /*
                            {
                                label: 'Dupliquer',
                                icon: 'far fa-copy',
                                onClick: this.handleDuplicate.bind(this),
                                className: ''
                            },
                            */
                            {
                                label: 'Supprimer',
                                icon: 'fa fa-trash-alt',
                                onClick: this.handleRemove.bind(this),
                                className: 'text-danger'
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

                        {this.renderGroups()}

                        <BoxAddGroup
                            identifier='1'
                            title='Add group'
                            onClick={this.handleAddGroup.bind(this)}
                        />


                    </div>
                    <div className="sidebar">

                        <InputField
                            label={'Name'}
                            value={this.props.form.role.name}
                            name={'name'}
                            onChange={this.props.updateField}
                        />

                        <InputField
                            label={'Identifier'}
                            value={this.props.form.role.identifier}
                            name={'identifier'}
                            onChange={this.props.updateField}

                        />

                        <IconField
                            label={'Icone'}
                            name={'icon'}
                            value={this.props.form.role.icon}
                            onChange={this.props.updateField}
                        />

                        <ToggleField
                            label={'Default'}
                            name={'default'}
                            checked={this.props.form.role.default}
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
        form: state.form,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initState: (roleId) => {
            return dispatch(initState(roleId));
        },
        reload: (roleId) => {
            return dispatch(reload(roleId));
        },
        submitRole: (payload) => {
            return dispatch(submitRole(payload));
        },
        updateField: (name, value) => {
            return dispatch(updateField(name, value));
        },
        openModalEditGroup: (group) => {
            return dispatch(openModalEditGroup(group));
        },
        openModalEditPermission: (permission) => {
            return dispatch(openModalEditPermission(permission));
        },
        openModalCreateGroup: () => {
            return dispatch(openModalCreateGroup());
        },
        removeGroup : (group) => {
            return dispatch(removeGroup(group));
        },
        updatePermission : (role,permission,value) => {
            return dispatch(updatePermission(role,permission,value))
        },
        openModalCreatePermission : () => {
            return dispatch(openModalCreatePermission())
        },
        openModalPermissionFromGroup : (group) => {
            return dispatch(openModalPermissionFromGroup(group))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesUpdateRedux);
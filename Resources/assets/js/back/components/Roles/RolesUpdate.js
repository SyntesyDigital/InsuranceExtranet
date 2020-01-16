import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary';
import ButtonSecondary from '../Layout/ButtonSecondary';
import CollapsableGroup from '../Layout/CollapsableGroup';
import BoxAddGroup from '../Layout/BoxAddGroup';
import ToggleField from '../Layout/Fields/ToggleField';
import SidebarTitle from '../Layout/SidebarTitle';
import ModalEditPermision from '../Roles/ModalEditPermision';
import ModalEditGroup from '../Roles/ModalEditGroup';
import Checkbox from '../Layout/CheckBox';
import InputField from '../Layout/Fields/InputField';
import ButtonDropdown from '../Layout/ButtonDropdown';
import IconField from '../Layout/Fields/IconField';
import BoxInputAdd from '../Layout/BoxInputAdd';

/**
 * Acciones : 
 *  - duplicar
 *  - borrar
 *  - guardar
 *  - parte creación nuevo permiso ( modal inidividual )
 */
export default class RolesUpdate extends Component {

    constructor(props) {

        super(props);

        this.state = {
            //modals
            displayGroup: false,
            displayPermision: false,

            //to know if create or edit
            saved : true,

            //role
            role : {
                id : 1,
                name : 'Admin',
                identifier : 'admin',
                icon : 'fa fa-pencil',
                default : true,
                groups : [
                    {
                        id : 1,
                        identifier : 'group_1',
                        name : 'Group 1',
                        default : true,
                        permissions : [
                            {
                                id : 1,
                                identifier : 'permission_1',
                                name : 'Permission 1',
                                value : true
                            },
                            {
                                id : 2,
                                identifier : 'permission_2',
                                name : 'Permission 2',
                                value : true
                            }
                        ]
                    },
                    {
                        id : 2,
                        identifier : 'group_2',
                        name : 'Group 2',
                        permissions : [
                            {
                                id : 3,
                                identifier : 'permission_3',
                                name : 'Permission 3',
                                value : true
                            },
                            {
                                id : 4,
                                identifier : 'permission_4',
                                name : 'Permission 4',
                                value : false
                            }
                        ]
                    },
                    {
                        id : 3,
                        identifier : 'group_3',
                        name : 'Group 3',
                        permissions : []
                    }
                ]
            }

        };
    }

    openModalEditGroup(group) {
        
        this.setState({
            displayGroup: true,
            selectedGroup : group
        });
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

        this.setState({
            displayPermision: true,
            selectedGroup : group,
            selectedPermission : permission
        });
    }


    handleModalClose() {
        this.setState({
            displayGroup: false,
            displayPermision: false,
            selectedGroup : null,
            selectedPermission : null
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
    }

    handlePermissionChange(permission,group,e) {
        console.log("handlePermissionChange :: (value,permission)",e.target.checked,permission);
    }

    handleFieldChange(name,value) {
        console.log("handleFieldChange :: (name,value) ",name,value);
        const {role} = this.state;

        role[name] = value;
        this.setState({
            role : role
        });
    }

    handleAddGroup(e) {
        e.preventDefault();
        const role = this.state.role;

        var maxId = 0;
        for(var i=0;i<role.groups.length;i++){
            maxId = Math.max(role.groups[i].id,maxId);
        }

        maxId++;
        
        role.groups.push({
            id : maxId,
            identifier : 'group_'+maxId,
            name : 'Group '+maxId,
            permissions : []
        });

        this.setState({
            role : role
        });
    }

    handleRemoveGroup(group,e) {
        console.log("handleRemoveGroup :: (group)",group);
    }

    handleUpGroup(group,e) {
        console.log("handleUpGroup :: (group)",group);
    }

    handleDownGroup(group,e) {
        console.log("handleDownGroup :: (group)",group);
    }

    handleGroupFieldChange(name,value) {
        
        const {selectedGroup,role} = this.state;

        var index = null;
        for(var i=0;i<role.groups.length;i++){
            if(role.groups[i].id == selectedGroup.id){
                index = i;
                break;
            }
        }

        if(index == null)
            return;

        role.groups[index][name] = value;
        this.setState({
            role : role
        });
    }

    renderGroups() {
        return this.state.role.groups.map((item,index) => 
        <CollapsableGroup
            key={item.id}
            identifier={item.identifier}
            title={item.name}
            icon=''
            editable={true}
            sortable={true}
            index={index}
            length={this.state.role.groups.length}
            onEdit={this.openModalEditGroup.bind(this,item)}
            onRemove={this.handleRemoveGroup.bind(this,item)}
            onUp={this.handleUpGroup.bind(this,item)}
            onDown={this.handleDownGroup.bind(this,item)}
        >
            {this.renderPermissions(item.permissions)}

            <div className="col-md-4">
                <BoxInputAdd
                    onClick={this.openModalEditPermision.bind(this,null,item)}
                />
            </div>

        </CollapsableGroup>
        );
    }

    renderPermissions(permissions,group) {
        if(permissions === undefined)
            return null;

        return permissions.map((item,index) => 
            <div className="col-md-4">
                <div className="container-checkbox">
                    <Checkbox
                        key={item.id}
                        title={item.name}
                        iconEdit={'far fa-edit'}
                        isEdit={true}
                        value={item.value}
                        onClick={this.openModalEditPermision.bind(this,item,group)}
                        onChange={this.handlePermissionChange.bind(this,item,group)}
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
                    size={'medium'}
                    title={'Permision | Edit'}
                    permission={this.state.selectedPermission}
                    group={this.state.selectedGroup}
                    roles={this.state.roles}
                    display={this.state.displayPermision}
                    zIndex={10000}
                    onModalClose={this.handleModalClose.bind(this)}
                >
                </ModalEditPermision>

                <ModalEditGroup
                    id={'modal-edit-group'}
                    icon={'fas fa-bars'}
                    size={'small'}
                    title={'Group | Edit'}
                    group={this.state.selectedGroup}
                    display={this.state.displayGroup}
                    onFieldChange={this.handleGroupFieldChange.bind(this)}
                    zIndex={10000}
                    onModalClose={this.handleModalClose.bind(this)}
                >
                </ModalEditGroup>

                <BarTitle
                    icon={this.state.role.icon}
                    title={this.state.role.name}
                    backRoute={routes['extranet.roles.index']}
                >
                    {this.state.saved && 
                        <ButtonSecondary
                            label={'Add permission'}
                            icon={'fa fa-plus-circle'}
                            onClick={this.openModalEditPermision.bind(this)}
                        />
                    }

                    <ButtonDropdown
                        label={'Actions'}
                        list={[
                            {
                                label : 'Nouveau',
                                icon : 'fa fa-plus-circle',
                                route : routes['extranet.roles.create'],
                                className : ''
                            },
                            {
                                label : 'Dupliquer',
                                icon : 'far fa-copy',
                                onClick : this.handleDuplicate.bind(this),
                                className : ''
                            },
                            {
                                label : 'Supprimer',
                                icon : 'fa fa-trash-alt',
                                onClick : this.handleRemove.bind(this),
                                className : 'text-danger'
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
                            value={this.state.role.name}
                            name={'name'}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <InputField
                            label={'Identifier'}
                            value={this.state.role.identifier}
                            name={'identifier'}
                            onChange={this.handleFieldChange.bind(this)}

                        />

                        <IconField
                            label={'Icone'}
                            name={'icon'}
                            value={this.state.role.icon}
                            onChange={this.handleFieldChange.bind(this)}
                        />

                        <ToggleField
                            label={'Default'}
                            name={'default'}
                            checked={this.state.role.default}
                            onChange={this.handleFieldChange.bind(this)}
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



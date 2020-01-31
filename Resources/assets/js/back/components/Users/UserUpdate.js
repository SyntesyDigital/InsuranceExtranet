import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonPrimary from '../Layout/ButtonPrimary';
import BarTitle from '../Layout/BarTitle';
import CollapsableGroup from '../Layout/CollapsableGroup';
import Checkbox from '../Layout/Fields/CheckField';
import ToggleField from '../Layout/Fields/ToggleField';


/**
 * Acciones : 
 *  - Cuando se hace click se llama ya las acciones de la API.
 *  - Accion 1 : añadir permiso, actualiza ese permiso en concreto
 *  - Accion 2 : añadir role, deberia añadir todos los permisos necesarios asociados a este rol.
 *      - cuando un permiso se añada a un rol, este permiso deberia añadirse automaticamente 
 *      a todos los usuarios.
 *      - cuando se activa un Rol es posible que se añadan otras funcionalidades a nivel de VEOS,
 *      como sucede con Olea con el extranet.
 *
 *  - toda la información de los grupos y sus valores se mezcla para facilitar React.
 *  - cada vez que se actualiza un rol o permiso devuelve todo el json otra vez,
 *      con esto actualiza el state, y asi es la API la que gestiona los estados
 *  - Para un pemiso no hace falta, pero para un rol si, porque hay interdependencias.
 *  - Saber en que lugares de la interfaz se esta usando un permiso, recorriendo todos los settings.
 */
export default class UserUpdate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user : {
                name : 'Name',
                email : 'user.email@gmail.com'
            },
            groups : [
                {
                    id : 1,
                    identifier : 'group_1',
                    name : 'Group 1',
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
                    name : 'Group 1',
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
                }
            ],
            roles : [{
                    id : 1,
                    identifier : 'admin',
                    name : 'Admin',
                    value : true
                },
                {
                    id : 2,
                    identifier : 'client',
                    name : 'Client',
                    value : false
                }
            ]
        }
    }

    handlePermissionInfo(permission) {
        console.log("handlePermissionInfo :: ",permission);
    }

    handleRoleChange(role,e) {
        console.log("handleRoleChange :: (e,role)",e,role);
    }

    handlePermissionChange(permission,e) {
        console.log("handlePermissionChange :: (value,permission)",e.target.checked,permission);
    }

    renderGroups() {
        return this.state.groups.map((item,index) => 
        <CollapsableGroup
            key={item.id}
            identifier={item.identifier}
            title={item.name}
        >
            {this.renderPermissions(item.permissions)}
        </CollapsableGroup>
        );
    }

    renderPermissions(permissions) {
        if(permissions === undefined)
            return null;

        return permissions.map((item,index) => 
            <div className="col-md-4">
                <div className="container-checkbox">
                    <Checkbox
                        key={item.id}
                        title={item.name}
                        iconEdit={'far fa-question-circle'}
                        isEdit={true}
                        value={item.value}
                        onClick={this.handlePermissionInfo.bind(this,item)}
                        onChange={this.handlePermissionChange.bind(this,item)}
                    />
                </div>
            </div>
        );
    }

    renderRoles() {
        return this.state.roles.map((item,index) => 
            <ToggleField
                key={item.id}
                label={item.name}
                checked={item.value}
                onChange={this.handleRoleChange.bind(this,item)}
            />
        )
    }

    render() {
        return (
            <div className="roles-update">
                <BarTitle
                    icon={'fa fa-user'}
                    title={this.state.user.name}
                    backRoute={routes['extranet.users.index']}
                >

                    {/*
                    <ButtonPrimary
                        label={'Sauvegarder'}
                        icon={'fa fa-save'}
                    />
                    */}

                </BarTitle>

                <div className="container rightbar-page">
                    <div className="col-md-9 page-content form-fields">
                        
                        {this.renderGroups()}

                    </div>

                    <div className="sidebar">
                        {this.renderRoles()}
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('user-update')) {
    ReactDOM.render(<UserUpdate />, document.getElementById('user-update'));
}

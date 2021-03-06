import React, { Component } from 'react';
import BarTitle from '../Layout/BarTitle';
import ButtonPrimary from '../Layout/ButtonPrimary'
import CollapsableGroup from '../Layout/CollapsableGroup';
import Checkbox from '../Layout/Fields/CheckField';
import ToggleField from '../Layout/Fields/ToggleField';
import { connect } from 'react-redux';

import {
    initState,
    updateUserPermission,
    loadUser,
    updateRole
} from './actions'

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

class UserUpdateRedux extends Component {

    constructor(props) {

        super(props);

        this.state = {
            
        };

        this.props.loadUser(this.props.userId);
    }

    
    // ==============================
    // OnEvents
    // ==============================

    onRoleUpdate(role, value) {
        console.log("onRoleUpdate :: ", role, value);
        this.props.updateRole(role, value);
    }

    onPermissionUpdate(permission, e) {
        console.log("onPermissionUpdate :: ", permission, e.target.checked);
        this.props.updateUserPermission(permission, e.target.checked);
    }

    // ==============================
    // Handlers
    // ==============================

    handlePermissionInfo(permission) {
        console.log("handlePermissionInfo :: ", permission);
    }

    handleRoleChange(role, index, name, value) {
        this.props.updateRole(role, value, index);
        console.log("handleRoleChange :: (role, name, value)", role, name, value);
    }

    handlePermissionChange(permission, e) {
        console.log("handlePermissionChange :: (value,permission)", e.target.checked, permission);
    }

    renderGroups() {
        return this.props.form.groups.map((item, index) =>
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
        if (permissions === undefined)
            return null;

        return permissions.map((item, index) =>
            <div className="col-md-4">
                <div className="container-checkbox">
                    <Checkbox
                        key={item.id}
                        title={item.name}
                        iconEdit={'far fa-question-circle'}
                        isEdit={true}
                        value={item.value}
                        onClick={this.handlePermissionInfo.bind(this, item)}
                        onChange={this.onPermissionUpdate.bind(this, item)}
                    />
                </div>
            </div>
        );
    }

    renderRoles() {
        return this.props.form.roles.map((item, index) =>
            <ToggleField
                key={item.id}
                label={item.name}
                checked={item.value}
                name={item.identifier}
                onChange={this.handleRoleChange.bind(this, item, index)}
            />
        )
    }

    render() {
        return (
            <div className="roles-update">
                <BarTitle
                    icon={'fa fa-user'}
                    title={this.props.form.user.lastname}
                    backRoute={routes['extranet.users.index']}
                >
            
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
        loadUser: (userId) => {
            return dispatch(loadUser(userId));
        },
        updateUserPermission: (permission, value) => {
            return dispatch(updateUserPermission(permission, value));
        },
        updateRole: (role, value, index) => {
            return dispatch(updateRole(role, value, index));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdateRedux);
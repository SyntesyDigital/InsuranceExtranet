import {
    CREATE_ROLE,
    UPDATE_ROLE
} from "../constants/";

import api from "../../../api/";

import {
    processRoleAfterUpdate,
    getRolePermission
} from "../functions";

/**
 * 
 * Everytime submit is pressed the state info is send to process.
 * 
 * @param {*} payload 
 */
export function submitRole(role) {

    //if not saved create
    if (role.id == null) {
        return createRole(role);
    }
    else {
        //else update
        return updateRole(role);
    }
}

export function createRole(role) {
    return (dispatch) => {
        var _role = role;

        api.roles.create({
            name: role.name,
            identifier: role.identifier,
            icon: role.icon,
            default: role.default,
            permissions: getRolePermission(role)
        }).then(function (data) {
            dispatch({
                type: CREATE_ROLE,
                payload: processRoleAfterUpdate(data.data.createRole, _role)
            });
        });
    }
}

export function updateRole(role) {

    return (dispatch) => {

        var _role = role;

        api.roles.update(role.id, {
            name: role.name,
            identifier: role.identifier,
            icon: role.icon,
            default: role.default,
            permissions: getRolePermission(role)
        }).then(function (data) {
            dispatch({ 
                type: UPDATE_ROLE, 
                payload: processRoleAfterUpdate(data.data.updateRole, _role) 
            });
        });
    }
}

export function updatePermission(role, permission, value) {
    for (var i in role.groups) {
        for (var j in role.groups[i].permissions) {
            var currentPermission = role.groups[i].permissions[j];
            if (currentPermission.id == permission.id) {
                role.groups[i].permissions[j].value = value;
            }
        }
    }

    return updateRole(role);
}


import {
    INIT_STATE,
    UPDATE_FIELD,
    UPDATE_GROUPS,
    UPDATE_GROUP
} from "../constants/";

import {
    processGroups,
    processRole
} from "../functions";

import api from "../../../api/";


/**
 * Get form init data to fill state.
 */
export function initState(roleId) {
    return (roleId === undefined || roleId == null || roleId == '') 
        ? loadPermissionAndGroups() 
        : loadRole(roleId);
};

/**
 * Reload role information after permission group change.
 */
export function reload(roleId) {
    return (roleId === undefined || roleId == null || roleId == '') 
        ? reloadPermissionAndGroups() 
        : reloadRole(roleId);
}


export function loadRole(id) {
    return (dispatch) => {
        api.roles.get(id)
            .then(function (response) {
                dispatch({
                    type: INIT_STATE,
                    payload: processRole(
                        response.data.role,
                        response.data.permissionGroups,
                        response.data.permissions
                    )
                });
            });
    }
}


export function loadPermissionAndGroups() {
    return (dispatch) => {
        api.groups.getGroupsPermissions()
            .then(function (data) {
                dispatch({
                    type: INIT_STATE, 
                    payload: {
                        id: null,
                        name: '',
                        identifier: '',
                        icon: '',
                        default: false,
                        groups: processGroups(data.data.permissionGroups, data.data.permissions)
                    } 
                });
            });
    }
}


export function reloadPermissionAndGroups() {
    return (dispatch) => {
        api.groups.getGroupsPermissions()
            .then(function (data) {
                dispatch({
                    type: UPDATE_GROUPS,
                    payload: processGroups(data.data.permissionGroups, data.data.permissions)
                });
            });
    }
}


export function reloadRole(id) {
    return (dispatch) => {
        api.roles.get(id)
            .then(function (response) {
                var role = processRole(
                    response.data.role,
                    response.data.permissionGroups,
                    response.data.permissions
                );

                dispatch({
                    type: UPDATE_GROUP,
                    payload: role.groups
                });
            });
    }
}


export function updateField(name, value) {
    return { 
        type: UPDATE_FIELD, 
        payload: { 
            name: name, 
            value: value 
        } 
    };
}

export function removeRole(id) {
    return (dispatch) => {
        api.roles.delete(id)
            .then(function (response) {
                window.location.href = routes['extranet.roles.index'];
            });
    }
}
import {
    OPEN_MODAL_CRATE_PERMISSION,
    OPEN_MODAL_EDIT_PERMISSION,
    CANCEL_EDIT_PERMISSION,
    REMOVE_PERMISSION,
    UPDATE_MODAL_ROLES_GROUPS,
    OPEN_MODAL_PERMISSION_FROM_GROUP,
    UPDATE_MODAL_PERMISSION,
    CREATE_PERMISSION,
    UPDATE_PERMISSION,
} from "../constants/";

import api from "../../../api/";

export function loadPermission(permission) {
    return (permission !== undefined && permission != null) 
        ? getPermission(permission.id)
        : loadRolesGroups();
}

export function getPermission(id) {
    return (dispatch) => {
        api.permissions
            .get(id)
            .then(function (data) {
                dispatch({ 
                    type: UPDATE_MODAL_PERMISSION, 
                    payload: data.data 
                });
            });
    }
}

export function loadRolesGroups() {
    return (dispatch) => {
        api.permissions
            .getAll()
            .then(function (data) {
                dispatch({ 
                    type: UPDATE_MODAL_ROLES_GROUPS, 
                    payload: data.data 
                });
            })
    }
}

export function openModalCreatePermission(group) {
    return { 
        type: OPEN_MODAL_CRATE_PERMISSION,
        payload: group
    };
}

export function openModalEditPermission(permission) {
    return { 
        type: OPEN_MODAL_EDIT_PERMISSION, 
        payload: permission 
    };
}

export function openModalPermissionFromGroup(group) {
    return { 
        type: OPEN_MODAL_PERMISSION_FROM_GROUP, 
        payload: group 
    };
}

export function cancelEditPermission() {
    return { 
        type: CANCEL_EDIT_PERMISSION 
    };
}

export function savePermission(permission, role) {
    return permission.id != null 
        ? updatePermission(permission, role) 
        : createPermission(permission);
}

export function createPermission(permission) {
    return (dispatch) => {
        api.permissions
            .create({
                name: permission.name,
                identifier: permission.identifier,
                group_id: parseInt(permission.group)
            }).then(function (data) {
                dispatch({ 
                    type: CREATE_PERMISSION, 
                    payload: data.data.createPermission 
                });
            });
    }

}

export function updatePermission(permission) {
    return (dispatch) => {
        api.permissions
            .update(permission.id, {
                name: permission.name,
                identifier: permission.identifier,
                group_id: permission.group
            }).then(function (response) {

                toastr.success(Lang.get('fields.success'));

                dispatch({ 
                    type: UPDATE_PERMISSION,
                    permission: response.data.updatePermission !== undefined 
                        ? response.data.updatePermission 
                        : null
                });
            },function(error){
                console.error("error",error);
                toastr.error(error.message);
            });
    }
}

export function removePermission(permission) {
    return (dispatch) => {
        api.permissions
            .delete(permission.id)
            .then(function (data) {

                toastr.success(Lang.get('fields.success'));

                dispatch({ 
                    type: REMOVE_PERMISSION, 
                    payload: data.data.deletePermission 
                });
            },function(error){
                console.error("error",error);
                toastr.error(error.message);
            });
    }
}



function getGroupIndex(role, groupId) {
    for (var key in role.groups) {
        if (role.groups[key].id == groupId) {
            return key;
        }
    }
    return null;
}

function getPermissionIndex(group, permisisonId) {
    for (var key in group.permissions) {
        if (group.permissions[key].id == permisisonId) {
            return key;
        }
    }
    return null;
}





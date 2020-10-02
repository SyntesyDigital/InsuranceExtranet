import {
    INIT_STATE,
    LOAD_USER,
    UPDATE_USER_ROLE,
    UPDATE_USER_PERMISSION

} from "../constants/";

import {
    processGroups
} from "../functions/";

import api from "../../../api/";


export function initState(payload) {
    return { 
        type: INIT_STATE, 
        payload 
    }
};

// ==============================
// Users
// ==============================

export function loadUser(userId) {
    return (dispatch) => {
        api.users
            .get(userId)
            .then(function (data) {    

                var groups = processGroups(
                    data.data.permissionGroups,
                    data.data.permissions,
                    []
                );

                dispatch({ 
                    type: LOAD_USER, 
                    payload : {
                        user : data.data.user,
                        groups : groups,
                        roles : data.data.roles
                    } 
                });
            });
    }
};

// ==============================
// Roles
// ==============================

export function updateRole(userId, role, enabled) {

    return (dispatch) => {
        api.users
            .update(userId, {
                roles: {
                    sync: Array.isArray(role) ? role : [role.id]
                }
            })
            .then(function (response) {   
                dispatch(loadUser(userId));          

                dispatch({ 
                    type: UPDATE_USER_ROLE, 
                    payload: response.data.updateUser.roles
                });
            });
    };

    // return { 
    //     type: UPDATE_USER_ROLE, 
    //     payload: {
    //         role: role,
    //         // value: value,
    //         // index: index
    //     }
    // };
};

// ==============================
// Permissions
// ==============================

export function updateUserPermission(userId, permission, value) {
    return (dispatch) => {
        api.users
            .updatePermission(userId, permission.id, value)
            .then(function (response) {    
                dispatch({ 
                    type: UPDATE_USER_PERMISSION, 
                    payload: response.data.updateUserPermission !== undefined 
                        ? response.data.updateUserPermission 
                        : []
                });
            });
    };
};


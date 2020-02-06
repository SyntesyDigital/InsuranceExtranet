import {
    INIT_STATE,
    LOAD_USER,
    UPDATE_USER_ROLE,
    UPDATE_USER_PERMISSION

} from "../constants/";

import {
    query,
    GQL_GET_USER
  } from "../api/";

import {
    processGroups
  } from "../functions/";




export function initState(payload) {
    return { type: INIT_STATE, payload }
};

// ==============================
// Users
// ==============================

export function loadUser(userId) {

    return (dispatch) => {

        console.log("loadUser ",userId);

        query(GQL_GET_USER,{
            id : userId
        })
            .then(function (data) {
                
                console.log("loadUser : ",data);
    
                var groups = processGroups(
                    data.data.permissionGroups,
                    data.data.permissions,
                    []
                );

                var payload = {
                    user : data.data.user,
                    groups : groups,
                    roles : data.data.roles
                };

            dispatch({ type: LOAD_USER, payload : payload });
        });
    }
};

// ==============================
// Roles
// ==============================

export function updateRole(role, value, index) {
    return { type: UPDATE_USER_ROLE, payload: {
        role: role,
        value: value,
        index: index
    }}
};

// ==============================
// Permissions
// ==============================

export function updateUserPermission(permission) {
    return {
        type: UPDATE_USER_PERMISSION , payload: {
            permission: permission,
            value: value
        }
    };
};


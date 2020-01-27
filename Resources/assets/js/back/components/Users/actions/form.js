import {
    INIT_STATE,
    LOAD_USER,
    UPDATE_USER_ROLE,
    UPDATE_USER_PERMISSION

} from "../constants/";

import {
    apiGetUser,
    apiUpdateUserRole,
    apiUpdateUserPermission,
  
  } from "../api/";


export function initState(payload) {
    return { type: INIT_STATE, payload }
};

// ==============================
// Users
// ==============================

export function loadUser(userId) {
    return { type: LOAD_USER, userId }
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


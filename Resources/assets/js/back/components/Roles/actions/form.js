import {
  INIT_STATE,
  CREATE_ROLE,
  UPDATE_ROLE,
  LOAD_PERMISSION,
  UPDATE_FIELD,
  OPEN_MODAL_CREATE_GROUP,
  OPEN_MODAL_EDIT_GROUP,
  CANCEL_EDIT_GROUP,
  UPDATE_GROUP,
  SAVE_GROUP,
  REMOVE_GROUP,
  OPEN_MODAL_EDIT_PERMISSION,
  CANCEL_EDIT_PERMISSION,
  REMOVE_PERMISSION
} from "../constants/";

import {
  getData,
  postCreateRole,
  postUpdateRole,
  getPermission,
  apiRemoveGroup,
  apiUpdateGroup,
  apiCreateGroup,
  apiCreatePermission,
  apiUpdatePermission,
  apiRemovePermission,
  apiCreateRole,
  apiUpdateRole,
  apiRemoveRole,

} from "../api/";

/**
 * Get form init data to fill state.
 */
export function initState() {

  return (dispatch) => {

    getData()
      .then(function (data) {

        dispatch({ type: INIT_STATE, data });
      });
  }
};

export function updateField(name, value) {

  return {
    type: UPDATE_FIELD, payload: {
      name: name,
      value: value
    }
  };

}

// ==============================
// Groups
// ==============================

export function openModalCreateGroup() {
  return { type: OPEN_MODAL_CREATE_GROUP };
}

export function openModalEditGroup(group) {
  return { type: OPEN_MODAL_EDIT_GROUP, payload: group };
}

export function updateGroup() {
  return { type: UPDATE_GROUP };
}

export function cancelEditGroup() {
  return { type: CANCEL_EDIT_GROUP };
}

export function saveGroup() {
  return { type: SAVE_GROUP };
}

export function removeGroup(group) {
  return { type: REMOVE_GROUP, payload: group };
}

// ==============================
// Permissions
// ==============================

export function openModalEditPermission(permission) {
  return { type: OPEN_MODAL_EDIT_PERMISSION, payload: permission };
}

export function cancelEditPermission() {
  return { type: CANCEL_EDIT_PERMISSION };
}

export function removePermission(permission) {
  return { type: REMOVE_PERMISSION, payload: permission };
}

/**
 * 
 * Everytime submit is pressed the state info is send to process.
 * 
 * @param {*} payload 
 */
export function submitRole(payload) {

  //if not saved create
  if (!payload.saved) {
    return createRole(payload);
  }
  else {
    //else update
    return updateRole(payload);
  }
}

export function createRole(payload) {

  return (dispatch) => {

    postCreateRole(payload)
      .then(function (data) {

        dispatch({ type: CREATE_ROLE, data });
      })
  }
}

export function updateRole(payload) {

  return (dispatch) => {

    postUpdateRole(payload)
      .then(function (data) {

        dispatch({ type: UPDATE_ROLE, data });
      })
  }
}

export function loadPermission(payload) {

  return (dispatch) => {

    getPermission(payload)
      .then(function (data) {

        dispatch({ type: LOAD_PERMISSION, data });
      })
  }

}

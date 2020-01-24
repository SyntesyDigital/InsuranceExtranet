import {
  OPEN_MODAL_CRATE_PERMISSION,
  OPEN_MODAL_EDIT_PERMISSION,
  CANCEL_EDIT_PERMISSION,
  REMOVE_PERMISSION,
  UPDATE_MODAL_ROLES_GROUPS,
  OPEN_MODAL_PERMISSION_FROM_GROUP,
  UPDATE_MODAL_PERMISSION
} from "../constants/";

import {
  mutation,
  query,
  GQL_LOAD_PERMISSION,
  GQL_LOAD_ROLES_GROUPS
} from "../api/";

export function loadPermission(permission) {

  console.log("loadPermission(permission)",permission);

  if(permission !== undefined && permission != null) {
    return getPermission(permission.id);
  }
  else {
    return loadRolesGroups();
  }
}

export function getPermission(permissionId) {
  return (dispatch) => {
    query(GQL_LOAD_PERMISSION,{id : permissionId})
      .then(function(data) {
        console.log("getPermission : ",data);
        dispatch({type : UPDATE_MODAL_PERMISSION, payload : data.data});
      })
  }
}
export function loadRolesGroups() {
  return (dispatch) => {
    query(GQL_LOAD_ROLES_GROUPS)
      .then(function(data) {
        console.log("loadRolesGroups : ",data);
        dispatch({type : UPDATE_MODAL_ROLES_GROUPS, payload : data.data});
      })
  }
}

export function openModalCreatePermission() {
  return { type: OPEN_MODAL_CRATE_PERMISSION};
}

export function openModalEditPermission(permission) {
  return { type: OPEN_MODAL_EDIT_PERMISSION, payload: permission };
}

export function openModalPermissionFromGroup(group) {
  return { type: OPEN_MODAL_PERMISSION_FROM_GROUP, payload: group };
}

export function cancelEditPermission() {
  return { type: CANCEL_EDIT_PERMISSION };
}

export function removePermission(permission) {
  return { type: REMOVE_PERMISSION, payload: permission };
}


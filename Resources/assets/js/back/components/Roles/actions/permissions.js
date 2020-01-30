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

import {
  mutation,
  query,
  GQL_LOAD_PERMISSION,
  GQL_LOAD_ROLES_GROUPS,
  GQL_CREATE_PERMISSION,
  GQL_UPDATE_PERMISSION,
  GQL_REMOVE_PERMISSION
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

export function savePermission(permission,role) {

  if(permission.id != null){
    return updatePermission(permission,role);
  }
  else {
    return createPermission(permission);
  }
}

export function createPermission(permission) {

  console.log("createPermission (permission) ",permission);

  return (dispatch) => {

    mutation(GQL_CREATE_PERMISSION,{
        name : permission.name,
        identifier : permission.identifier,
        group_id : permission.group
      }
    )
      .then(function (data) {
        console.log("createPermission : ",data.data.createPermission);
        dispatch({ type: CREATE_PERMISSION, payload : data.data.createPermission });
      });
  }

}

function getGroupIndex(role,groupId) {
  for(var key in role.groups) {
      if(role.groups[key].id == groupId) {
          return key;
      }
  }
  return null;
}

function getPermissionIndex(group,permisisonId) {
  for(var key in group.permissions) {
    if(group.permissions[key].id == permisisonId) {
        return key;
    }
  }
  return null;
}


export function updatePermission(permission,role) {

  console.log("updatePermission (permission,role) ",permission,role);

  return (dispatch) => {

    var _permission = permission;
    var _role = role;

    mutation(GQL_UPDATE_PERMISSION,{
        id : permission.id,
        name : permission.name,
        identifier : permission.identifier,
        group_id : permission.group
      }
    )
      .then(function (data) {
        dispatch({ type: UPDATE_PERMISSION});
      });
  }

}

export function removePermission(permission) {

  return (dispatch) => {

    mutation(GQL_REMOVE_PERMISSION,{
        id : permission.id
      }
    )
      .then(function (data) {

        console.log("deletePermission (data)",data.data); 

        dispatch({ type: REMOVE_PERMISSION,payload : data.data.deletePermission});
      });
  }

}




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
  GQL_UPDATE_PERMISSION
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
        console.log("updatePermission : ",data.data.updatePermission);

        //process the new permission if group changed
        var newPermission = data.data.updatePermission;
        if(newPermission.group.id != _permission.group){
          //group has changed, need to update the array
          //remove from previous group
          var groupIndex = getGroupIndex(_role,_permission.group);
          var permissionIndex = getPermissionIndex(_role.groups[groupIndex],_permission.id);

          console.log("upgatePermission change group (groupIndex, permissionIndex)",groupIndex,permissionIndex);

          //clone the object to have a copy
          var tempPermission = JSON.parse(JSON.stringify(_role.groups[groupIndex].permissions[permissionIndex]));
          console.log("upgatePermission (tempPermission)",tempPermission);
          
          //remove permission
          _role.groups[groupIndex].permissions.slice(permissionIndex,1);

          tempPermission.name = newPermission.name;
          tempPermission.identifier = newPermission.identifier;

          var newGroupIndex = getGroupIndex(_role,newPermission.group.id);
          _role.groups[newGroupIndex].permissions.push(tempPermission);

        }
        else {
          //only update the values of the permission
          var groupIndex = getGroupIndex(_role,newPermission.group.id);
          var permissionIndex = getPermissionIndex(_role.groups[groupIndex],newPermission.id);

          _role.groups[groupIndex].permissions[permissionIndex].name = newPermission.name;
          _role.groups[groupIndex].permissions[permissionIndex].identifier = newPermission.identifier;
        }

        dispatch({ type: UPDATE_PERMISSION, payload : _role});
      });
  }

}


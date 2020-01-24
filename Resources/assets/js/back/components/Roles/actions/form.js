import {
  INIT_STATE,
  CREATE_ROLE,
  UPDATE_ROLE,
  LOAD_PERMISSION,
  UPDATE_FIELD,
  OPEN_MODAL_EDIT_PERMISSION,
  CANCEL_EDIT_PERMISSION,
  REMOVE_PERMISSION,
  CREATE_GROUP
} from "../constants/";

import {
  mutation,
  query,
  GQL_GET_ROLE,
  GQL_GET_GROUPS_PERMISSIONS
  
  /*
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
  */

} from "../api/";

import {
  processGroups,
  processRole
} from "../functions";

/**
 * Get form init data to fill state.
 */
export function initState(roleId) {

  //console.log("initState (roleId) ",roleId);

  if(roleId === undefined || roleId == null || roleId == ''){
    //create, load init state
    return loadPermissionAndGroups();
    
  }
  else {
    //edit load role
    return loadRole(roleId);
  }
};

export function loadRole(roleId) {
  return (dispatch) => {

    //console.log("loadRole (roleId) ",roleId);

    query(GQL_GET_ROLE,{
      id : roleId
    })
      .then(function (data) {
        //console.log("loadRole : ",data);

        var role = processRole(
          data.data.role,
          data.data.permissionGroups,
          data.data.permissions
        );

        dispatch({ type: INIT_STATE, payload : role });
      });
  }
}

export function loadPermissionAndGroups() {
  return (dispatch) => {

    //console.log("loadPermissionAndGroups () ");

    query(GQL_GET_GROUPS_PERMISSIONS)
      .then(function (data) {

        var groups = processGroups(data.data.permissionGroups,data.data.permissions);
        
        //process state
        var role = {
          id: null,
          name: '',
          identifier: '',
          icon: '',
          default: false,
          groups : groups
        }

        //console.log("loadPermissionAndGroups : ",role);
        dispatch({ type: INIT_STATE, payload : role });
      });
  }
}

export function updateField(name,value) {
  return {type : UPDATE_FIELD, payload : {name : name, value : value}};
}
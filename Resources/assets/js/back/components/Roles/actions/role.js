import {
  CREATE_ROLE,
  UPDATE_ROLE
} from "../constants/";

import {
  mutation,
  query,
  GQL_CREATE_ROLE,
  GQL_UPDATE_ROLE
} from "../api/";

import {
  processRoleAfterUpdate,
  getRolePermission
} from "../functions";

/**
 * 
 * Everytime submit is pressed the state info is send to process.
 * 
 * @param {*} payload 
 */
export function submitRole(role) {

  //if not saved create
  if (role.id == null) {
    return createRole(role);
  }
  else {
    //else update
    return updateRole(role);
  }
}

export function createRole(role) {

  return (dispatch) => {

    var _role = role;

    mutation(GQL_CREATE_ROLE,{
        name : role.name,
        identifier : role.identifier,
        icon : role.icon,
        default : role.default,
        permissions : getRolePermission(role)
      }
    )
    .then(function (data) {
      //console.log("createRole (apiRole, _role) ",data.data.createRole, _role);

      var role = processRoleAfterUpdate(data.data.createRole,_role);

      dispatch({ type: UPDATE_ROLE, payload : role });
    });
  }
}

export function updateRole(role) {

  return (dispatch) => {

    var _role = role;

    mutation(GQL_UPDATE_ROLE,{
        id : role.id,
        name : role.name,
        identifier : role.identifier,
        icon : role.icon,
        default : role.default,
        permissions : getRolePermission(role)
      }
    )
    .then(function (data) {
      console.log("updateRole : ",data.data.updateRole,_role);

      var role = processRoleAfterUpdate(data.data.updateRole,_role);

      dispatch({ type: UPDATE_ROLE, payload : role });
    });
  }
}

export function updatePermission(role,permission,value) {
  for(var i in role.groups){
    for(var j in role.groups[i].permissions){
      var currentPermission = role.groups[i].permissions[j];
      if(currentPermission.id == permission.id) {
        role.groups[i].permissions[j].value = value;
      }
    }
  }

  return updateRole(role);

}


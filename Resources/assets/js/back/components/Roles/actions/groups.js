import {
  OPEN_MODAL_CREATE_GROUP,
  OPEN_MODAL_EDIT_GROUP,
  CANCEL_EDIT_GROUP,
  UPDATE_GROUP,
  SAVE_GROUP,
  REMOVE_GROUP,
  CREATE_GROUP
} from "../constants/";

import {
  mutation,
  query,
  GQL_CREATE_GROUP,
  GQL_UPDATE_GROUP,
  GQL_REMOVE_GROUP,
} from "../api/";

export function openModalCreateGroup() {
  return { type: OPEN_MODAL_CREATE_GROUP };
}

export function openModalEditGroup(group) {
  return { type: OPEN_MODAL_EDIT_GROUP, payload: group };
}

export function saveGroup(group) {

  if(group.id != null){
    return updateGroup(group);
  }
  else {
    return createGroup(group);
  }
}

export function createGroup(group) {

  return (dispatch) => {

    mutation(GQL_CREATE_GROUP,{
        name : group.name,
        identifier : group.identifier
      }
    )
      .then(function (data) {
        console.log("createGroup : ",data.data.createPermissionGroup);
        dispatch({ type: CREATE_GROUP, payload : data.data.createPermissionGroup });
      });
  }

}

export function updateGroup(group) {
  return (dispatch) => {

    mutation(GQL_UPDATE_GROUP,{
        id : group.id,
        name : group.name,
        identifier : group.identifier
      }
    )
      .then(function (data) {
        console.log("updateGroup : ",data.data.updatePermissionGroup);
        dispatch({ type: UPDATE_GROUP, payload : data.data.updatePermissionGroup });
      });
  }
}

export function cancelEditGroup() {
  return { type: CANCEL_EDIT_GROUP };
}


export function removeGroup(group) {
  return (dispatch) => {

    mutation(GQL_REMOVE_GROUP,{
        id : group.id
      }
    )
      .then(function (data) {
        console.log("removeGroup : ",data.data.deletePermissionGroup);
        dispatch({ type: REMOVE_GROUP, payload : data.data.deletePermissionGroup });
      });
  }
}
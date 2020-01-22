import {
  INIT_STATE,
  CREATE_ROLE,
  UPDATE_ROLE,
  LOAD_PERMISSION,
  UPDATE_FIELD,
  OPEN_MODAL_EDIT_GROUP,
  CLOSE_MODAL_EDIT_GROUP
} from "../constants/";

import {
  getData,
  postCreateRole,
  postUpdateRole,
  getPermission
} from "../api/";

/**
 * Get form init data to fill state.
 */
export function initState() {

  return (dispatch) => {
  
    getData()
      .then(function(data){
    
        dispatch({ type: INIT_STATE, data });
      });
  }
};

export function updateField(name, value) {

  return {type : UPDATE_FIELD, payload : {
    name : name,
    value : value
  }};

}

export function openModalEditGroup(group) {
  return {type: OPEN_MODAL_EDIT_GROUP, payload :group };
}

export function closeModalEditGroup() {
  return {type: CLOSE_MODAL_EDIT_GROUP};
}

/**
 * Everytime submit is pressed the state info is send to process.
 * 
 * @param {*} payload 
 */
export function submitRole(payload) {

  //if not saved create
  if(!payload.saved) {
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
      .then(function(data){
    
        dispatch({ type: CREATE_ROLE, data });
      })
   }
}

export function updateRole(payload) {

  return (dispatch) => {
  
    postUpdateRole(payload)
      .then(function(data){
    
        dispatch({ type: UPDATE_ROLE, data });
      })
   }
}

export function loadPermission(payload) {

  return (dispatch) => {
  
    getPermission(payload)
      .then(function(data){
    
        dispatch({ type: LOAD_PERMISSION, data });
      })
   }

}

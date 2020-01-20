import {
  INIT_STATE,
  CREATE_ROLE,
  UPDATE_ROLE,
  LOAD_PERMISSION
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

import {
  MODAL_CONTENT_OPEN,
  MODAL_CONTENT_CLOSE,
  MODAL_CONTENT_SELECT,
  MODAL_CONTENT_CLEAR,
  MODAL_CONTENT_INIT,
  MODAL_CONTENT_UNSELECT,
  MODAL_CONTENT_UPDATED,

  PARAMETERS_INIT,
  PARAMETERS_OPEN_MODAL,
  PARAMETERS_CLOSE_MODAL,
  PARAMETERS_UPDATE,
  PARAMETERS_CLEAR,
} from "../constants/";


export function openModalContents() {

  return {type : MODAL_CONTENT_OPEN};
}

export function closeModalContents() {

  return {type : MODAL_CONTENT_CLOSE};

}

export function selectContent(content) {

  return {type : MODAL_CONTENT_SELECT, payload:content};

}

//when button is presed by the user
export function unselectContent() {

  return {type : MODAL_CONTENT_UNSELECT};

}

//clear to component unmount
export function clearContent() {

  return {type : MODAL_CONTENT_CLEAR};

}

export function initContent(content) {

  return {type : MODAL_CONTENT_INIT, payload:content};

}

export function contentUpdated() {

  return {type : MODAL_CONTENT_UPDATED};

}

/**
*   Init with parameters already set
*/
export function initParameters(content) {
  return {type : PARAMETERS_INIT, payload: content}
}

export function openModalParameters() {

  return {type : PARAMETERS_OPEN_MODAL};
}

export function closeModalParameters() {

  return {type : PARAMETERS_CLOSE_MODAL};

}

export function updateParameter(parameter) {

  return {type : PARAMETERS_UPDATE, payload: parameter};

}

export function clearParameters(parameter) {

  return {type : PARAMETERS_CLEAR};

}

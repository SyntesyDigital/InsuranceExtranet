import {
  HAS_MODAL_ELEMENTS_OPEN_MODAL,
  HAS_MODAL_ELEMENTS_CLOSE_MODAL,
  HAS_MODAL_ELEMENTS_UPDATE,
  HAS_MODAL_ELEMENTS_CLEAR,
  HAS_MODAL_ELEMENTS_UPDATED,
  HAS_MODAL_ELEMENTS_INIT,
  HAS_MODAL_ELEMENTS_SELECT,
  HAS_MODAL_ELEMENTS_UNSELECT,

  HAS_MODAL_ELEMENTS_PARAMETERS_INIT,
  HAS_MODAL_ELEMENTS_PARAMETERS_OPEN_MODAL,
  HAS_MODAL_ELEMENTS_PARAMETERS_CLOSE_MODAL,
  HAS_MODAL_ELEMENTS_PARAMETERS_UPDATE,
  HAS_MODAL_ELEMENTS_PARAMETERS_CLEAR,

  HAS_MODAL_CONTENTS_OPEN_MODAL,
  HAS_MODAL_CONTENTS_CLOSE_MODAL,
  HAS_MODAL_CONTENTS_SELECT

} from "../constants/";


export function openModalElements() {

  return {type : HAS_MODAL_ELEMENTS_OPEN_MODAL};
}

export function closeModalElements() {

  return {type : HAS_MODAL_ELEMENTS_CLOSE_MODAL};

}

export function selectElement(element) {

  return {type : HAS_MODAL_ELEMENTS_SELECT, payload:element};

}

//when button is presed by the user
export function unselectElement() {

  return {type : HAS_MODAL_ELEMENTS_UNSELECT};

}

//clear to component unmount
export function clearElement() {

  return {type : HAS_MODAL_ELEMENTS_CLEAR};

}

export function initElement(element) {

  return {type : HAS_MODAL_ELEMENTS_INIT, payload:element};

}

export function elementUpdated() {

  return {type : HAS_MODAL_ELEMENTS_UPDATED};

}

/**
*   Init with parameters already set
*/
export function initElementParameters(element) {
  return {type : HAS_MODAL_ELEMENTS_PARAMETERS_INIT, payload: element}
}

export function openModalElementParameters() {

  return {type : HAS_MODAL_ELEMENTS_PARAMETERS_OPEN_MODAL};
}

export function closeModalElementParameters() {

  return {type : HAS_MODAL_ELEMENTS_PARAMETERS_CLOSE_MODAL};

}

export function updateElementParameter(parameter) {

  return {type : HAS_MODAL_ELEMENTS_PARAMETERS_UPDATE, payload: parameter};

}

export function clearElementParameters(parameter) {

  return {type : HAS_MODAL_ELEMENTS_PARAMETERS_CLEAR};

}


export function openModalElementRedirect() {

  return {type : HAS_MODAL_CONTENTS_OPEN_MODAL};
}

export function closeModalElementRedirect() {

  return {type : HAS_MODAL_CONTENTS_CLOSE_MODAL};

}

export function selectContentElementRedirect(content) {

  return {type : HAS_MODAL_CONTENTS_SELECT,payload : content};

}


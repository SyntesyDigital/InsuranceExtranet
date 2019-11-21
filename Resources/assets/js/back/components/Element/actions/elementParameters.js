import {
  ELEMENT_PARAMETERS_OPEN_MODAL,
  ELEMENT_PARAMETERS_CLOSE_MODAL,
  ELEMENT_PARAMETERS_UPDATE,
  ELEMENT_PARAMETERS_CLEAR,
  ELEMENT_PARAMETERS_CLOSED
} from "../constants/";


export function openElementParametersSettings(parameter) {

  return {type : ELEMENT_PARAMETERS_OPEN_MODAL, payload : parameter};
}

export function closeElementParametersSettings() {

  return {type : ELEMENT_PARAMETERS_CLOSE_MODAL};

}

export function onElementParametersClosed() {

  return {type : ELEMENT_PARAMETERS_CLOSED};

}

export function changeElementParametersSettings(parameter) {
  return {type : ELEMENT_PARAMETERS_UPDATE, payload : parameter};
}

import {
  SETTINGS_SELECT,
  SETTINGS_CANCEL,
  UPDATE_SETTINGS

} from "../constants/";


export function editSettings(item) {

  return { type: SETTINGS_SELECT, payload : item };
};

export function cancelSettings() {

  return { type: SETTINGS_CANCEL };
};

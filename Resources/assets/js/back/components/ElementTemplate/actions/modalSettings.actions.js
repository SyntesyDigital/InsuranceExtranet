import {
    SETTINGS_SELECT,
    SETTINGS_CANCEL
} from "../constants/";

// ==============================
// Actions MODAL SETTINGS
// ==============================

export function editSettings(item) {
    return { 
        type: SETTINGS_SELECT, 
        payload: item 
    };
};
  
export function cancelSettings() {  
    return { 
        type: SETTINGS_CANCEL 
    };
};



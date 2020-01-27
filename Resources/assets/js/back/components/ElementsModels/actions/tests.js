import {
    INIT_STATE,
    TEST_FORM,
    CLOSE_MODAL_TEST
    
} from "../constants/";

// import {

  
//   } from "../api/";

export function initState(payload) {
    return { type: INIT_STATE, payload }
};

export function testForm(form) {
    return {
        type: TEST_FORM, payload: {
            form: form,
        }
    };
};

export function closeTest() {
    return {
        type: CLOSE_MODAL_TEST , payload: {
        
        }
    };
};

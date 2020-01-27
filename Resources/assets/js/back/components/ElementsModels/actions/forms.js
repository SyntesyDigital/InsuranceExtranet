import {
    INIT_STATE,
    UPDATE_FIELD,
    UPDATE_FORM,
    REMOVE_FORM,

} from "../constants/";

// import {


//   } from "../api/";

export function initState(payload) {
    return { type: INIT_STATE, payload }
};

export function updateField(name, value) {
    return {
        type: UPDATE_FIELD, payload: {
            name: name,
            value: value
        }
    };
}

export function loadForm(formId) {
    return { type: UPDATE_FORM, formId }
};

export function saveForm(form) {
    return {
        type: UPDATE_FORM, payload: {
            form: form,
        }
    };
}

export function createForm(form) {
    return {
        type: UPDATE_FORM, payload: {
            form: form,
        }
    }
};

export function updateForm(form) {
    return {
        type: UPDATE_FORM, payload: {
            form: form,
        }
    }
};

export function removeForm(form) {
    return {
        type: REMOVE_FORM, payload: {
            form: form,
        }
    }
};

export function duplicateForm(form) {
    // return { type: UPDATE_FORM, payload: {
    //     role: role,
    //     value: value,
    //     index: index
    // }}
};






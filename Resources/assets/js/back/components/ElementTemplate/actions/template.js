import {
    INIT_STATE_TEMPLATE,
    UPDATE_FORM,
    UPDATE_FIELD,
    REMOVE_FORM
} from "../constants/";

export * from './helpers';

// ==============================
// Actions
// ==============================

export function initStateTemplate(payload) {
    return {
        type: INIT_STATE_TEMPLATE,
        payload
    }
};

export function updateField(name, value) {
    return {
        type: UPDATE_FIELD, payload: {
            name: name,
            value: value,
        }
    }
};

export function addField(payload) {
    console.log('action -> addField :: ', payload)
};

export function loadForm(payload) {
    console.log('action -> loadForm :: ', payload)
};

export function saveForm(payload) {
    console.log('action -> saveForm :: ', payload)
};

export function createForm(payload) {
    console.log('action -> createForm :: ', payload)
};

export function updateForm(payload) {
    return {
        type: UPDATE_FORM,
        payload
    };
};

export function removeForm(payload) {
    return {
        type: REMOVE_FORM,
        payload
    };
};





import {
    INIT_STATE_TEMPLATE,
    UPDATE_FORM,
    UPDATE_FIELD,
    REMOVE_FORM
} from "../constants/";

export function initStateTemplate(payload) {
    console.log('action -> initState :: ', payload)
    return { type: INIT_STATE_TEMPLATE, payload }
};

export function updateField(name, value) {
    console.log('action -> updateField :: ', name, value)
    return {
        type: UPDATE_FIELD, payload: {
            name: name,
            value: value,
        }
    }
};

export function addField(payload) {
    console.log('action -> addField :: ', payload)
    // return { type: , payload }
};

export function loadForm(payload) {
    console.log('action -> loadForm :: ', payload)
    // return { type: , payload }
};

export function saveForm(payload) {
    console.log('action -> saveForm :: ', payload)
    // return { type: , payload }
};

export function createForm(payload) {
    console.log('action -> createForm :: ', payload)
    // return { type: , payload }
};

export function updateForm(payload) {
    console.log('action -> updateForm :: ', payload)
    return { type: UPDATE_FORM, payload }
};

export function removeForm(payload) {
    console.log('action -> removeForm :: ', payload)
    return { type: REMOVE_FORM, payload }
};


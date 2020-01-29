import {
    INIT_STATE,
    OPEN_MODAL_CREATE_PROCEDURE,
    OPEN_MODAL_EDIT_PROCEDURE,
    REMOVE_PROCEDURE,
    UPDATE_PROCEDURES,
    CLOSE_MODAL_PROCEDURES,

} from "../constants/";


export function initState(payload) {
    return { type: INIT_STATE, payload }
};

export function openModalCreateProcedure() {
    return {
        type: OPEN_MODAL_CREATE_PROCEDURE, payload: {
            
        }
    };
};

export function openModalEditProcedure(procedure) {
    return { type: OPEN_MODAL_EDIT_PROCEDURE, payload: procedure };
};

export function removeProcedure(procedure) {
    return { type: REMOVE_PROCEDURE, payload: procedure };
};

export function moveProcedure() {
    return {
        type: UPDATE_PROCEDURES, payload: {

        }
    };
};

export function updateProcedureField(procedure, name, value) {
    return {
        type: UPDATE_PROCEDURES, payload: {
            procedure: procedure,
            name: name,
            value: value
        }
    };
};

export function updateSettings(procedure, name, value) {
    return {
        type: UPDATE_PROCEDURES, payload: {
            procedure: procedure,
            name: name,
            value: value
        }
    };
};


export function closeModalProcedure() {
    return {
        type: CLOSE_MODAL_PROCEDURES, payload: {

        }
    };
};


import {
    INIT_STATE,
    OPEN_MODAL_CREATE_OBJECT,
    OPEN_MODAL_EDIT_OBJECT,
    CLOSE_MODAL_PROCEDURE_OBJECT,
    UPDATE_PROCEDURES,

} from "../constants/";

// import {


//   } from "../api/";

export function initState(payload) {
    return { type: INIT_STATE, payload }
};


export function openModalCreateObject(procedure) {
    return {
        type: OPEN_MODAL_CREATE_OBJECT, payload: {
            procedure: procedure,
        }
    };
};

export function openModalEditObject(procedure, object) {
    return {
        type: OPEN_MODAL_EDIT_OBJECT, payload: {
            procedure: procedure,
            object: object
        }
    };
};

export function closeModalProcedureObject() {
    return {
        type: CLOSE_MODAL_PROCEDURE_OBJECT, payload: {
       
        }
    };
};

export function removeProcedureObject(procedure, object) {
    return {
        type: UPDATE_PROCEDURES, payload: {
            procedure: procedure,
            object: object
        }
    };
};

export function moveProcedureObject(procedure, object) {
    return {
        type: UPDATE_PROCEDURES, payload: {
            procedure: procedure,
            object: object
        }
    };
};





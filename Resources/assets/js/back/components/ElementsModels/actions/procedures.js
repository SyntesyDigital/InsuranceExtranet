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

function getMaxId (list) {
    var maxId = 0;
    for(var index in list) {
        maxId = Math.max(list[index].id,maxId);
    }
    return parseInt(maxId) + 1;
}

export function openModalCreateProcedure(procedures) {

    var id = getMaxId(procedures);

    var procedure = {
        id: id,
        name: 'Procedure '+id,
        service: '',
        configurable: false,
        required: false,
        repeatable: false,
        objects: []
    };

    procedures.push(procedure);

    return {
        type: UPDATE_PROCEDURES, payload: procedures
    };
};

export function openModalEditProcedure(procedure) {
    return { type: OPEN_MODAL_EDIT_PROCEDURE, payload: procedure };
};

export function removeProcedure(procedures,procedure) {

    var index = getProcedureIndex(procedures,procedure);

    procedures.splice(index,1);

    return { type: UPDATE_PROCEDURES, payload: procedures };
};

export function moveProcedure() {
    return {
        type: UPDATE_PROCEDURES, payload: {

        }
    };
};

function getProcedureIndex(procedures,procedure) {
    for(var index in procedures) {
        if(procedures[index].id == procedure.id){
            return index;
        }
    }
    return null;
}

export function updateProcedureField(procedures, procedure, name, value) {

    procedure[name] = value;
    var index = getProcedureIndex(procedures,procedure);
    procedures[index] = procedure;

    return {
        type: UPDATE_PROCEDURES, payload: procedures
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


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

function getMaxId (list) {
    var maxId = 0;
    for(var index in list) {
        maxId = Math.max(list[index].id,maxId);
    }
    return parseInt(maxId) + 1;
}

export function openModalCreateObject(procedures,procedure) {

    var index = getProcedureIndex(procedures,procedure);
    var maxId = getMaxId(procedures[index].objects);

    procedures[index].objects.push({
        id : maxId,
        identifier: 'identifier '+maxId,
        name: 'Field Name '+maxId,
        icon: 'fas fa-calculator',
        format: 'Num',
        defaultValue: 'defaultValue',
        boby: 'boby',
        jsonPath: 'jsonPath',
        example: 'example',
        configurable: false,
        visible: false,
    });

    return {
        type: UPDATE_PROCEDURES, payload: procedures
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

function getProcedureIndex(procedures,procedure) {
    for(var index in procedures) {
        if(procedures[index].id == procedure.id){
            return index;
        }
    }
    return null;
}

function getObjectIndex(objects,object) {
    for(var index in objects) {
        if(objects[index].id == object.id){
            return index;
        }
    }
    return null;
}

export function updateProcedureObjectField(procedures, procedure, object, name, value) {

    object[name] = value;
    var index = getProcedureIndex(procedures,procedure);
    var objectIndex = getObjectIndex(procedure.objects,object);
    procedures[index].objects[objectIndex] = object;

    return {
        type: UPDATE_PROCEDURES, payload: procedures
    };
};

export function removeProcedureObject(procedures, procedure, object) {

    var index = getProcedureIndex(procedures,procedure);
    var objectIndex = getObjectIndex(procedure.objects,object);
    procedures[index].objects.splice(objectIndex,1);

    return {
        type: UPDATE_PROCEDURES, payload: procedures
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





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

export function openModalCreateObject() {

    return {
        type: OPEN_MODAL_CREATE_OBJECT
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

export function saveProcedureObject(procedures,procedure,object) {

    if(object.id == null){
        return createProcedureObject(procedures,procedure,object);
    }
    else {
        return updateProcedureObject(procedures,procedure,object);
    }
};

export function createProcedureObject(procedures,procedure,object) {

    //FIXME upate wit api result
    object.id = 100;
    var index = getProcedureIndex(procedures,procedure);
    procedures[index].objects.push(object);

    return { type: UPDATE_PROCEDURES, payload: procedures };
};

export function updateProcedureObject(procedures,procedure,object) {

    var index = getProcedureIndex(procedures,procedure);
    var objectIndex = getObjectIndex(procedure.objects,object);
    
    procedures[index].objects[objectIndex] = object;

    return { type: UPDATE_PROCEDURES, payload: procedures };
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





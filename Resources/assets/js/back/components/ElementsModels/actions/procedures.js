import {
    INIT_STATE,
    OPEN_MODAL_CREATE_PROCEDURE,
    OPEN_MODAL_EDIT_PROCEDURE,
    REMOVE_PROCEDURE,
    UPDATE_PROCEDURES,
    CLOSE_MODAL_PROCEDURES,

} from "../constants/";

import api from '../../../api/index.js';


function getMaxId (list) {
    var maxId = 0;
    for(var index in list) {
        maxId = Math.max(list[index].id,maxId);
    }
    return parseInt(maxId) + 1;
}

export function openModalCreateProcedure(procedures) {

    return {
        type: OPEN_MODAL_CREATE_PROCEDURE
    };
};

export function openModalEditProcedure(procedure) {
    return { type: OPEN_MODAL_EDIT_PROCEDURE, payload: procedure };
};

export function saveProcedure(modelId,procedures,procedure) {

    if(procedure.id == null){
        return createProcedure(modelId,procedures,procedure);
    }
    else {
        return updateProcedure(modelId,procedures,procedure);
    }
};

export function createProcedure(modelId,procedures,procedure) {

    console.log("createProcedure (procedure)",procedure);

    return (dispatch) => {
        api.procedures.create({
            name : procedure.name,
            configurable: procedure.configurable,
            required: procedure.required,
            repeatable: procedure.repeatable,
            repeatable_json: procedure.repeatable_json,
            repeatable_jsonpath : procedure.repeatable_jsonpath,
            service_id: procedure.service.id,
            model_id: modelId,
            order : procedure.order,
            preload : procedure.preload
        })
        .then(function(data) {

            toastr.success(Lang.get('fields.success'));

            procedure.id = data.data.createModelProcedure.id;
            procedures.push(procedure);
            dispatch({ type: UPDATE_PROCEDURES, payload: procedures });
        })
        .catch(function(error) {
            toastr.error(error.message);
        });
    }
};

export function updateProcedure(modelId,procedures,procedure) {

    return (dispatch) => {
        api.procedures.update(procedure.id,{
            name : procedure.name,
            configurable: procedure.configurable,
            required: procedure.required,
            repeatable: procedure.repeatable,
            repeatable_json: procedure.repeatable_json,
            repeatable_jsonpath : procedure.repeatable_jsonpath,
            service_id: procedure.service.id,
            model_id: modelId,
            order : procedure.order,
            preload : procedure.preload
        })
        .then(function(data) {

            var index = getProcedureIndex(procedures,procedure);
            var objectsCopy = procedures[index].fields;
            procedures[index] = procedure;
            //objects are modified directly in the state
            procedures[index].fields = objectsCopy;

            toastr.success(Lang.get('fields.success'));

            dispatch({ type: UPDATE_PROCEDURES, payload: procedures });
        })
        .catch(function(error) {
            toastr.error(error.message);
        });

    }

};

export function removeProcedure(procedures,procedure) {

    return (dispatch) => {
        api.procedures.delete(procedure.id)
        .then(function(data) {
            var index = getProcedureIndex(procedures,procedure);
            procedures.splice(index,1);

            toastr.success(Lang.get('fields.success'));

            dispatch({ type: UPDATE_PROCEDURES, payload: procedures });
        })
        .catch(function(error) {
            toastr.error(error.message);
        });
    }    
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


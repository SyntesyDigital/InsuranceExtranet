import {
    INIT_STATE,
    OPEN_MODAL_PROCEDURE,
    CLOSE_MODAL_PROCEDURE,
    REMOVE_PROCEDURE,
    UPDATE_PROCEDURES,
    IMPORT_PROCEDURE_OBJECTS
} from "../constants/";

import api from '../../../api/index.js';


// function getMaxId (list) {
//     var maxId = 0;
//     for(var index in list) {
//         maxId = Math.max(list[index].id,maxId);
//     }
//     return parseInt(maxId) + 1;
// }

export function openModalProcedure(procedure) {
    return {
        type: OPEN_MODAL_PROCEDURE,
        payload: procedure
    };
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
            preload : procedure.preload,
            prefixed : procedure.prefixed,
            duplicate : procedure.duplicate,
        })
        .then(function(data) {
            toastr.success(Lang.get('fields.success'));
            procedure.id = data.data.createModelProcedure.id;
            procedure.service = data.data.createModelProcedure.service;
            procedures.push(procedure);

            dispatch({ 
                type: UPDATE_PROCEDURES, 
                payload: procedures 
            });
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
            preload : procedure.preload,
            prefixed : procedure.prefixed,
            duplicate : procedure.duplicate,
            // fields: {
            //     upsert: procedure.fields.map(field => {
            //         return {
            //             name: field.name,
            //             identifier: field.identifier,
            //             type: 'CTE',
            //             format: field.format !== undefined ? field.format : 'text',
            //             default_value: field.default_value !== undefined ? field.default_value : null,
            //             boby: null,
            //             jsonpath: null,
            //             example: null,
            //             configurable: true,
            //             visible: true,
            //             required: true,
            //         };
            //     })
            // }
        })
        .then(function(data) {
            procedure.service = data.data.updateModelProcedure.service;

            var index = getProcedureIndex(procedures,procedure);
            var objectsCopy = procedures[index].fields;
            procedures[index] = procedure;
            //procedures[index].fields = objectsCopy;

            toastr.success(Lang.get('fields.success'));

            dispatch({ 
                type: UPDATE_PROCEDURES, 
                payload: procedures 
            });
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

            dispatch({ 
                type: UPDATE_PROCEDURES, 
                payload: procedures 
            });
        })
        .catch(function(error) {
            toastr.error(error.message);
        });
    }    
};

export function moveProcedure() {
    return {
        type: UPDATE_PROCEDURES, 
        payload: {}
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
        type: UPDATE_PROCEDURES, 
        payload: procedures
    };
};

export function updateSettings(procedure, name, value) {
    return {
        type: UPDATE_PROCEDURES, 
        payload: {
            procedure: procedure,
            name: name,
            value: value
        }
    };
};

export function closeModalProcedure() {
    return {
        type: CLOSE_MODAL_PROCEDURE, 
        payload: {}
    };
};

const fn = (object, jsonpath) => {
    return Object.entries(object).reduce((acc, arr) => {
      let key = arr[0];
      let value = arr[1];
    
      if(typeof value !== 'object' && typeof value !== 'array') {
          if(value == '*') {
            acc.push({
              identifier : key,
              jsonpath: jsonpath !== undefined ? jsonpath : key
            });
          }
      } 
      
     return acc;
  }, []);
}

export function importFieldsFromService(procedure) {
    return (dispatch) => {
        return api.services.get(procedure.service.id)
            .then(response => {

                let payload =  JSON.parse(response.data.service.response_json);

                let fields = fn(payload.data[0]).map((field, index) => {
                    
                    api.fields.create({
                        procedure_id: procedure.id,
                        name: field.identifier, 
                        identifier: field.identifier,
                        type: 'INPUT',
                        format: '',
                        visible: 1,
                        configurable: 1,
                        index: index,
                        jsonpath: field.jsonpath !== undefined ? field.jsonpath : null
                    }).then(response => {
                        dispatch({ 
                            type: IMPORT_PROCEDURE_OBJECTS,
                            payload: response.data.createModelField
                        });
                    });

                    // return {
                    //     name: field.identifier, 
                    //     identifier: field.identifier,
                    //     type: 'CTE',
                    //     format: 'text',
                    //     visible: 1,
                    //     index: index,
                    //     jsonpath: field.jsonpath
                    // };
                });
            });
    }
};


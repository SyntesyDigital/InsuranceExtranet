import {
    INIT_STATE,
    UPDATE_FIELD,
    UPDATE_FORM,
    REMOVE_FORM,
    TEST_FORM,
    INIT_CREATE,
    LOAD_TABLE_FIELD,
    UPDATE_PROCEDURES
} from "../constants/";

import api from '../../../api/index.js';

function transformElementModel(model) {
    for(var key in model.procedures){
        //model.procedures[key].service = model.procedures[key].service.id
    }
    return model;
}


export function initState(modelId, type) {
    if(modelId === undefined || modelId == null || modelId == '') {
        return { 
            type: INIT_CREATE,
            payload: {
                type: type
            }
        };
    }
        
    return (dispatch) => {
        api.elementModel.get(modelId)
            .then(function(response) {
                let model = response.data.elementModel;
                let payload = transformElementModel(model);
                payload.type = type;

                if(type == 'table' || type == 'fiche') {
                    dispatch({ 
                        type: LOAD_TABLE_FIELD, 
                        payload : model.procedures.length > 0 ? model.procedures[0].fields : null,
                    });
                }
                
                dispatch({ 
                    type: INIT_STATE, 
                    payload : payload,
                });
            });
    }
};

export function updateField(name, value) {
    return {
        type: UPDATE_FIELD, payload: {
            name: name,
            value: value
        }
    };
}

export function saveForm(form) {
    return form.id === null 
        ? createForm(form) 
        : updateForm(form);
}

export function createForm(form) {
    return (dispatch) => {
        api.elementModel.create({
            name : form.name,
            identifier : form.identifier,
            description : form.description,
            icon : form.icon,
            type : form.type,
            validation_ws : form.validation_ws
        })
        .then(function(response) {

            let model = response.data.createElementModel;

            if((form.type == "table" || form.type == "fiche") && form.service_id !== undefined) {
                api.procedures.create({
                    name : form.type + '_' +  form.identifier,
                    configurable: false,
                    required: true,
                    repeatable: false,
                    repeatable_json: false,
                    repeatable_jsonpath: '',
                    prefixed: false,
                    duplicate: false,
                    preload: false,
                    service_id: form.service_id,
                    model_id: model.id ,
                    order: 0
                }).then(function(response) {
                    dispatch({
                        type: UPDATE_PROCEDURES, 
                        payload: response.data.createModelProcedure
                    });
                });
            } 

            toastr.success(Lang.get('fields.success'));

            dispatch({
                type: UPDATE_FORM, 
                payload: model
            });
        })
        .catch(function(error) {
            toastr.error(error.message);
        });
    }
};

export function updateForm(form) {
    
    return (dispatch) => {
        api.elementModel.update(form.id,{
            name : form.name,
            identifier : form.identifier,
            description : form.description,
            icon : form.icon,
            type : form.type,
            validation_ws : form.validation_ws
        })
        .then(function(response) {
            let model = response.data.updateElementModel;
            
            if((form.type == "table" || form.type == "fiche") && form.fields !== undefined && form.procedure) {

                api.procedures.update(form.procedure.id, {
                    name : form.type + '_' +  form.identifier,
                    configurable: false,
                    required: true,
                    repeatable: false,
                    repeatable_json: false,
                    repeatable_jsonpath: '',
                    prefixed: false,
                    duplicate: false,
                    preload: false,
                    service_id: form.service_id,
                    model_id: model.id ,
                    order: 0
                }).then(function(response) {
                    dispatch({
                        type: UPDATE_PROCEDURES, 
                        payload: response.data.updateModelProcedure
                    });
                });

                // Remove all fields from procedure 
                form.procedure.fields.map(field => api.fields.delete(field.id));

                form.fields.map(field => {
                    api.fields.create({
                        procedure_id: form.procedure.id,
                        name: field.name,
                        identifier: field.identifier,
                        type: 'CTE',
                        format: field.format !== undefined ? field.format : 'text',
                        default_value: field.default_value !== undefined ? field.default_value : null,
                        boby: null,
                        jsonpath: null,
                        example: null,
                        configurable: true,
                        visible: true,
                        required: true,
                    })
                        .then(function (res) {
                            field.id = res.data.createModelField.id;
                        })
                        .catch(function (error) {
                            toastr.error(error.message);
                        });
                });
            }

            toastr.success(Lang.get('fields.success'));

            dispatch({
                type: UPDATE_FORM, 
                payload: model
            });
        })
        .catch(function(error) {
            console.log(error);
            toastr.error(error.message);
        });
    }
};

export function removeForm(form) {
    return (dispatch) => api.elementModel.delete(form.id)
        .then(function(data) {
            window.location.href = routes['extranet.elements-models.forms.index'];
        });
};

export function testForm(form) {
    return {
        type: TEST_FORM, payload: {
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






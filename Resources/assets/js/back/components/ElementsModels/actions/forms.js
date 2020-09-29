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

export function saveForm(state) {
    return state.form.id === null 
        ? createForm(state) 
        : updateForm(state);
}

export function createForm(state) {
    return (dispatch) => {
        api.elementModel.create({
            name : state.form.name,
            identifier : state.form.identifier,
            description : state.form.description,
            icon : state.form.icon,
            type : state.form.type,
            validation_ws : state.form.validation_ws
        })
        .then(function(response) {

            let model = response.data.createElementModel;

            if(['table', 'fiche'].includes(state.form.type)) {
                api.procedures.create({
                    name : state.form.type + '_' +  state.form.identifier,
                    configurable: false,
                    required: true,
                    repeatable: false,
                    repeatable_json: false,
                    repeatable_jsonpath: '',
                    prefixed: false,
                    duplicate: false,
                    preload: false,
                    service_id: state.form.service_id,
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

export function updateForm(state) {
    
    return (dispatch) => {
        api.elementModel.update(state.form.id, {
            name : state.form.name,
            identifier : state.form.identifier,
            description : state.form.description,
            icon : state.form.icon,
            type : state.form.type,
            validation_ws : state.form.validation_ws
        })
        .then(function(response) {
            let model = response.data.updateElementModel;
            
            if(['table', 'fiche'].includes(state.form.type)) {

                api.procedures.update(state.currentProcedure.id, {
                    name : state.form.type + '_' +  state.form.identifier,
                    configurable: false,
                    required: true,
                    repeatable: false,
                    repeatable_json: false,
                    repeatable_jsonpath: '',
                    prefixed: false,
                    duplicate: false,
                    preload: false,
                    service_id: state.form.service_id,
                    model_id: model.id,
                    order: 0
                }).then(function(response) {
                    dispatch({
                        type: UPDATE_PROCEDURES, 
                        payload: response.data.updateModelProcedure
                    });
                });

                state.form.procedures[0].fields.map(field => api.fields.delete(field.id));

                state.currentProcedure.fields.map(field => {
                    api.fields.create({
                        procedure_id: state.currentProcedure.id,
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






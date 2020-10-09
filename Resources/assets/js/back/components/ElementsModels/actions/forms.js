import {
    INIT_STATE,
    UPDATE_FIELD,
    UPDATE_FORM,
    REMOVE_FORM,
    TEST_FORM,
    INIT_CREATE,
    LOAD_TABLE_FIELD,
    UPDATE_CURRENT_PROCEDURE
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
    //console.log("create form!");
    return (dispatch) => {
        api.elementModel.create({
            name : state.form.name,
            identifier : state.form.identifier,
            description : state.form.description,
            icon : state.form.icon,
            type : state.form.type,
            validation_ws : state.form.validation_ws,
            def1 : state.form.def1
        })
        .then(function(response) {

            let model = response.data.createElementModel;

            toastr.success(Lang.get('fields.success'));

            window.location.href = routes['extranet.elements-models.update']
                .replace(':id',model.id);

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
            validation_ws : state.form.validation_ws,
            def1 : state.form.def1
        })
        .then(function(response) {
            let model = response.data.updateElementModel;
            
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






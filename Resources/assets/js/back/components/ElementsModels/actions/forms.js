import {
    INIT_STATE,
    UPDATE_FIELD,
    UPDATE_FORM,
    REMOVE_FORM,
    TEST_FORM,
    INIT_CREATE

} from "../constants/";

import api from '../../../api/index.js';

function transformElementModel(model) {
    for(var key in model.procedures){
        //model.procedures[key].service = model.procedures[key].service.id
    }
    return model;
}


export function initState(modelId, type) {
    if(modelId === undefined || modelId == null || modelId == '')
        return { 
            type: INIT_CREATE,
            payload: {
                type: type
            }
        };

    return (dispatch) => {
        api.elementModel.get(modelId)
            .then(function(data) {
                var payload = transformElementModel(data.data.elementModel);
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
            type : form.type
        })
        .then(function(data) {

            toastr.success(Lang.get('fields.success'));

            dispatch({type: UPDATE_FORM, payload: data.data.createElementModel});
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
            type : form.type
        })
        .then(function(data) {

            toastr.success(Lang.get('fields.success'));

            dispatch({type: UPDATE_FORM, payload: data.data.updateElementModel});
        })
        .catch(function(error) {
            toastr.error(error.message);
        });
    }
};

export function removeForm(form) {

    return (dispatch) => {
        api.elementModel.delete(form.id)
            .then(function(data) {
                window.location.href = routes['extranet.elements-models.forms.index'];
            });
    }
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






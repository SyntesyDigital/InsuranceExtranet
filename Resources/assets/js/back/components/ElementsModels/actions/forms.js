import {
    INIT_STATE,
    UPDATE_FIELD,
    UPDATE_FORM,
    REMOVE_FORM,
    TEST_FORM,
    INIT_CREATE

} from "../constants/";

import api from '../../../api/index.js';

// import {


//   } from "../api/";

export function initState(modelId) {

    if(modelId === undefined || modelId == null || modelId == '')
        return { type: INIT_CREATE };

    return (dispatch) => {
        api.elementModel.get(modelId)
            .then(function(data) {
                //console.log("initState :: (data) ",data);
                dispatch({ type: INIT_STATE, payload : data.data.elementModel });
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

    if (form.id == null) {
        return createForm(form);
    }
    else {
        //else update
        return updateForm(form);
    }
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
            dispatch({type: UPDATE_FORM, payload: data.data.createElementModel});
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
            dispatch({type: UPDATE_FORM, payload: data.data.updateElementModel});
        });
    }
};

export function removeForm(form) {

    return (dispatch) => {
        api.elementModel.delete(form.id)
        .then(function(data) {

            window.location.href = routes['extranet.elements-models.forms.index'];

            //dispatch({type: UPDATE_FORM, payload: data.data.updateElementModel});
        });
    }

    return {
        type: REMOVE_FORM, payload: {
            form: form,
        }
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






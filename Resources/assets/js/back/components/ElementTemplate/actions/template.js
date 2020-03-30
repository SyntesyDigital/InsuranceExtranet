import {
    INIT_STATE_TEMPLATE,
    SUBMIT_FORM,
    SUBMITED_FORM,
    UPDATE_FIELD,
    LOAD_TEMPLATE,
    UPDATE_LAYOUT
} from "../constants/";

import api from '../../../api/index.js';

// ==============================
// Actions
// ==============================

export function initStateTemplate(payload) {
    return {
        type: INIT_STATE_TEMPLATE,
        payload
    }
};

export function updateField(name, value) {
    return {
        type: UPDATE_FIELD, 
        payload: {
            name: name,
            value: value,
        }
    }
};

export function addField(payload) {
    console.log('action -> addField :: ', payload)
};

export function loadForm(payload) {
    console.log('action -> loadForm :: ', payload)
};

export function loadTemplate(id) {
    return (dispatch) => {
        api.elementTemplates.get(id)
            .then(function(data) {
                console.log('elementTemplate', data.data.elementTemplate);

                dispatch({
                    type: LOAD_TEMPLATE, 
                    payload: data.data.elementTemplate
                });
            })
            .catch(function(error) {
                toastr.error(error.message);
            });
    }
}

export function submitForm(payload) {

    //console.log("submitForm :: payload : ",payload);
    var params = {
        id: payload.id ? payload.id : null,
        name : payload.name,
        layout : JSON.stringify(payload.layout),
        element_id : payload.elementId
    };

    //console.log("submitForm :: params : ",params);

    return (dispatch) => {
        var query = payload.id 
                ? api.elementTemplates.update(params.id, params)
                : api.elementTemplates.create(params);

        query
            .then(function(data) {
                toastr.success(Lang.get('fields.success'));
                dispatch({
                    type: SUBMITED_FORM, 
                    payload: payload.id 
                        ? data.data.updateElementTemplate 
                        : data.data.createElementTemplate 
                });
            })
            .catch(function(error) {
                toastr.error(error.message);
            });
    }
};

export function createForm(payload) {
    console.log('action -> createForm :: ', payload)
};

export function updateForm(payload) {
    return {
        type: SUBMIT_FORM,
        payload
    };
};


export function copyItem(pathToIndex, layout) {

    layout = changeItemChildren(layout, -1, pathToIndex, function (children, index) {

        var copy = jQuery.extend(true, {}, children[index]);

        if (index == children.length - 1) {
            children.push(copy);
        }
        else {
            children.splice(index + 1, 0, copy);
        }

        return children;
    });

    return { type: UPDATE_LAYOUT, payload: layout }

}

export function changePageField(field, pathToIndex, layout) {

    var data = field;

    ////console.log("changeField => ",field,pathToIndex);

    layout = changeItemWithCallback(layout, -1, pathToIndex, data,
        function (field, newField) {
            return newField;
        }
    );

    return { type: UPDATE_LAYOUT, payload: layout }

}

export function deletePageItem(pathToIndex, layout) {

    layout = removeItem(layout, -1, pathToIndex);

    return { type: UPDATE_LAYOUT, payload: layout }

}

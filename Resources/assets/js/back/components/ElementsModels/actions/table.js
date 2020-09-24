import {
    OPEN_MODAL_TABLE_FIELD,
    CLOSE_MODAL_TABLE_FIELD,
    IMPORT_TABLE_FIELD,
} from "../constants/";

import api from '../../../api/index.js';

export function openModalTableField(field) {
    return { 
        type: OPEN_MODAL_TABLE_FIELD,
        payload: field
    };
};

export function closeModalTableField() {
    return { 
        type: CLOSE_MODAL_TABLE_FIELD
    };
};

export function importFieldsFromService(id) {
    return (dispatch) => {
        return api.services.getBody(id)
            .then(response => {
                dispatch({ 
                    type: IMPORT_TABLE_FIELD,
                    payload: JSON.parse(response.data.serviceBody.body)
                });
            });
    }
};

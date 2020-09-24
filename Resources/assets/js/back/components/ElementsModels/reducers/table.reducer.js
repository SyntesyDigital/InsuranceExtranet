import {
    OPEN_MODAL_TABLE_FIELD,
    CLOSE_MODAL_TABLE_FIELD,
    IMPORT_TABLE_FIELD
} from '../constants';

const initialState = {
    displayModal: false,
    field: null,
    procedure: null,
    fields: []
};

function tableReducer(state = initialState, action) {

    switch (action.type) {

        case CLOSE_MODAL_TABLE_FIELD: 
            return {
                ...state,
                displayModal: false
            };

        case OPEN_MODAL_TABLE_FIELD: 
            return {
                ...state,
                displayModal: true,
                field: action.payload ? action.payload : null
            };

        case IMPORT_TABLE_FIELD: 
            let fields = Object.keys(action.payload.data[0]).map(k => {
                return {
                    name: k, 
                    identifier: k,
                    type: 'CTE',
                    format: 'text',
                    visible: 1
                };
            });

            return {
                ...state,
                fields: fields
            };

        default:
            return state;

    }
    
}

export default tableReducer;
import {
    OPEN_MODAL_TABLE_FIELD,
    CLOSE_MODAL_TABLE_FIELD,
    IMPORT_TABLE_FIELD,
    SAVE_TABLE_FIELD,
    CHANGE_TABLE_FIELD,
    LOAD_TABLE_FIELD,
    DELETE_TABLE_FIELD
} from '../constants';

const initialState = {
    displayModal: false,
    procedure: null,
    fields: [],
    form: {
        index: null,
        identifier : null,
        name: null,
        format: null, 
    }
};

function tableReducer(state = initialState, action) {

    switch (action.type) {

        case CLOSE_MODAL_TABLE_FIELD: 
            return {
                ...state,
                displayModal: false,
                form: {
                    index: null,
                    identifier : null,
                    name: null,
                    format: null,
                }
            };

        case OPEN_MODAL_TABLE_FIELD: 
            return {
                ...state,
                displayModal: true,
                form: {
                    index: action.payload ? action.payload.index : null,
                    identifier : action.payload ? action.payload.identifier : null,
                    name: action.payload ? action.payload.name : null,
                    format: action.payload ? action.payload.format : null,
                }
            };

        case CHANGE_TABLE_FIELD: 
            let form = state.form;
            form[action.payload.name] = action.payload.value;

            return {
                ...state,
                form: form
            };

        case SAVE_TABLE_FIELD:
            let index = state.form.index;

            if(index !== null) {
                state.fields[index] = {
                    ...state.form,
                    index: state.fields.length
                };
            } else {
                state.fields.push(state.form);
            }
            
            return {
                ...state
            };

        // case IMPORT_TABLE_FIELD: 
        //     return {
        //         ...state,
        //         fields: Object.keys(action.payload.data[0]).map((k, index) => {
        //             return {
        //                 name: k, 
        //                 identifier: k,
        //                 type: 'CTE',
        //                 format: 'text',
        //                 visible: 1,
        //                 index: index
        //             };
        //         })
        //     };

        case LOAD_TABLE_FIELD:
            return {
                ...state,
                fields: action.payload
            };

        case DELETE_TABLE_FIELD: 
            return {
                ...state,
                fields:  state.fields.filter(field => {
                    return action.payload.index == field.index ? false : true;
                })
            };

        default:
            return state;

    }
    
}

export default tableReducer;
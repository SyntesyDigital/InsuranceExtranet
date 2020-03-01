import {
    INIT_STATE_TEMPLATE,
    UPDATE_FORM,
    UPDATE_FIELD,
    REMOVE_FORM,
} from '../constants';

const initialState = {
    loaded : false,
    saved: false,
    champs: [
        {
            name: 'row',
            value: 'Row'
        },
        {
            name: 'row',
            value: 'Row'
        },
        {
            name: 'row',
            value: 'Row'
        },
    ],

    elements: [
        {
            name: 'elementfield1',
            value: 'Element Field 1'
        },
        {
            name: 'elementfield2',
            value: 'Element Field 2'
        },
        {
            name: 'elementfield3',
            value: 'Element Field 3'
        },
    ],

    name: 'template 01'
};


function templateReducer(state = initialState, action) {

    console.log("templateReducer :: REDUCER :: => ", action.type, action.payload);

    switch (action.type) {

        case INIT_STATE_TEMPLATE:
            return {
                ...state,
            };

        case UPDATE_FORM:
            return {
                ...state,
            };

        case UPDATE_FIELD:
            return {
                ...state,
            };

        case REMOVE_FORM:
            return {
                ...state,
            };

        default:
            return state;
    }
}

export default templateReducer;

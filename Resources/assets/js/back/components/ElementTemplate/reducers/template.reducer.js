import {
    INIT_STATE_TEMPLATE,
    UPDATE_FORM,
    UPDATE_FIELD,
    REMOVE_FORM,
} from '../constants';

const initialState = {
    saved: false,
    elementFields: [],
    commonFields: [],
    form: [
        {
            name: 'template-1',
        },
        {
            layout: [],
        },
        {
            templateFields: [],
        }
    ]
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

import {
    INIT_STATE_TEMPLATE,
    SUBMIT_FORM,
    SUBMITED_FORM,
    UPDATE_FIELD
} from "../constants/";


const initialState = {
    saved: false,
    modalItem: true,
    form: {
        id: null,
        name: null,
        layout: [],
        elementId: null
    }
};

function templateReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_STATE_TEMPLATE:
            return {
                ...state,
            };

        case SUBMIT_FORM:
            return {
                ...state,
            };
        case SUBMITED_FORM:
            state.form = action.payload;
            return {
                ...state,
            };

        case UPDATE_FIELD:
            state.form[action.payload.name] = action.payload.value;
            return {
                ...state,
            };

        default:
            return state;
    }
}

export default templateReducer;

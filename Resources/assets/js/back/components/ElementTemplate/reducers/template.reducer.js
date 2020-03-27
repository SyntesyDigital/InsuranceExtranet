import {
    INIT_STATE_TEMPLATE,
    SUBMIT_FORM,
    SUBMITED_FORM,
    UPDATE_FIELD,
    LOAD_TEMPLATE
} from "../constants/";


const initialState = {
    saved: false,
    modalItem: true,
    fields : [],
    form: {
        id: null,
        name: null,
        layout: [],
        elementId: null
    }
};

function templateReducer(state = initialState, action) {

    console.log("templateReducer :: ",action.type, action.payload);

    switch (action.type) {
        case INIT_STATE_TEMPLATE:
            return {
                ...state,
                 fields : action.payload.fields ? JSON.parse(atob(action.payload.fields)) : [],
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

        case LOAD_TEMPLATE:
            state.form = action.payload;
            return {
                ...state,
            };

        default:
            return state;
    }
}

export default templateReducer;

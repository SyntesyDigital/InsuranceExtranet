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
                form: {
                    ...state.form,
                    element_id: action.payload.elementId
                }
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
            return {
                ...state,
                form : action.payload
            };

        default:
            return state;
    }
}

export default templateReducer;

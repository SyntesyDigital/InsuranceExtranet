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
        layout: null,
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
                },
                fields : action.payload.fields ? JSON.parse(atob(action.payload.fields)) : [],
            };

        case SUBMIT_FORM:
            return {
                ...state,
            };
        case SUBMITED_FORM:
            return {
                ...state,
                //form : action.payload
            };

        case UPDATE_FIELD:
            var form = state.form;
            form[action.payload.name] = action.payload.value;
            
            return {
                ...state,
                form : form
            };

        case LOAD_TEMPLATE:

            var elementId = state.form.elementId;
            var form = action.payload
            form.elementId = elementId;
            form.layout = form.layout != null && form.layout != "null" && 
                form.layout !== undefined && form.layout != "" ? JSON.parse(form.layout) : [];
            
            return {
                ...state,
                form : form
            };

        default:
            return state;
    }
}

export default templateReducer;

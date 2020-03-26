import {
    INIT_STATE_TEMPLATE,
    UPDATE_FORM,
    UPDATE_FIELD,
    REMOVE_FORM,
    UPDATE_LAYOUT,
    SETTINGS_SELECT,
    SETTINGS_CANCEL,
    UPDATE_SETTINGS,
    UPDATE_ITEM,
    ITEM_SELECT,
    ITEM_CANCEL,
    ITEM_POSITION_AFTER
} from "../constants/";


const initialState = {
    saved: false,
    layout: [],
    modalItem: true,
    form: {
        name : "test"
    }
};

function templateReducer(state = initialState, action) {

    //console.log("templateReducer :: ",action.type, action.payload);

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

        case UPDATE_LAYOUT:
            return {
                ...state,
                layout: action.payload
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

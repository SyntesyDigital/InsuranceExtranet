import {
  SETTINGS_SELECT,
  SETTINGS_CANCEL,
  UPDATE_SETTINGS
} from '../constants';

const initialState =  {
  //modal states
  displayModal: false,
  item: null
}

function modalSettingsReducer(state = initialState, action) {

    //const {fields, translations} = state;

    switch(action.type) {
        case SETTINGS_SELECT :
            return {
                ...state,
                displayModal : true,
                item : action.payload
            }
        case SETTINGS_CANCEL :
            return {
                ...state,
                displayModal : false,
                item : null
            }

        case UPDATE_SETTINGS:
            return {
                ...state,
                displayModal : false,
                item : null
            }

        default:
            return state;
    }
}

export default modalSettingsReducer;

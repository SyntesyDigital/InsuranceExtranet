import {
  LAYOUT_SELECT,
  LAYOUT_CANCEL,
  UPDATE_PAGE_LAYOUT
} from '../constants';

const initialState =  {
  //modal states
  displayModal: false
}

function modalLayoutReducer(state = initialState, action) {

    //const {fields, translations} = state;

    switch(action.type) {
        case LAYOUT_SELECT :
            return {
                ...state,
                displayModal : true
            }
        case LAYOUT_CANCEL :
            return {
                ...state,
                displayModal : false
            }

        case UPDATE_PAGE_LAYOUT:
            return {
                ...state,
                displayModal : false
            }

        default:
            return state;
    }
}

export default modalLayoutReducer;

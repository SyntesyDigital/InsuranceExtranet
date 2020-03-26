import {
  EDIT_ITEM_LIST_SELECT,
  EDIT_ITEM_LIST_CANCEL,

} from '../constants';

const initialState =  {
  //modal states
  displayModal: false,
  item : null
}

function modalEditListReducer(state = initialState, action) {

    //const {fields, translations} = state;

    switch(action.type) {

        case EDIT_ITEM_LIST_SELECT :
            return {
                ...state,
                displayModal : true,
                item : action.payload
            }
        case EDIT_ITEM_LIST_CANCEL :
            return {
                ...state,
                displayModal : false,
                item : null
            }

        default:
            return state;
    }
}

export default modalEditListReducer;

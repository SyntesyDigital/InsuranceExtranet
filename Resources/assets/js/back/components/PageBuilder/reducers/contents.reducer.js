import {
  CONTENT_CANCEL,
  CONTENT_SELECT,
  UPDATE_SELECTED_CONTENT,
  UPDATE_PAGE_CONTENT

} from '../constants';

const initialState =  {
  //modal states
  displayModal: false,
  sourceField: null,
  listItemIndex : null
}

function contentsReducer(state = initialState, action) {

    //const {fields, translations} = state;

    switch(action.type) {
        case CONTENT_SELECT :
            return {
                ...state,
                displayModal : true,
                sourceField : action.payload.identifier,
                listItemIndex : action.payload.listItemIndex,
            }
        case CONTENT_CANCEL:
            return {
                ...state,
                displayModal : false,
                sourceField : null,
                listItemIndex : null
            }

        case UPDATE_PAGE_CONTENT:
        case UPDATE_SELECTED_CONTENT:
            return {
                ...state,
                displayModal : false,
                sourceField : null,
                listItemIndex : null
            }

        default:
            return state;
    }
}

export default contentsReducer;

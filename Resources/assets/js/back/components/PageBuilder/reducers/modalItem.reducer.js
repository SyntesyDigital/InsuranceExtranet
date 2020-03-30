import {
  ITEM_CANCEL,
  ITEM_SELECT,
  UPDATE_ITEM

} from '../constants';

const initialState =  {
  //modal states
  displayModal: false,
  pathToIndex: null,
  addPosition : null
}

function modalItemReducer(state = initialState, action) {

    //const {fields, translations} = state;

    switch(action.type) {
        case ITEM_SELECT :
            return {
                ...state,
                displayModal : true,
                pathToIndex : action.payload.pathToIndex,
                addPosition : action.payload.position
            }
        case ITEM_CANCEL :
            return {
                ...state,
                displayModal : false,
                pathToIndex : null,
                addPosition : null
            }

        case UPDATE_ITEM:
            return {
                ...state,
                displayModal : false,
                pathToIndex : null,
                addPosition : null
            }

        default:
            return state;
    }
}

export default modalItemReducer;

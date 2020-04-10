import {
  IMAGE_CANCEL,
  IMAGE_SELECT,
  UPDATE_IMAGE,
  UPDATE_PAGE_IMAGE

} from '../constants';

const initialState =  {
  //modal states
  displayModal: false,
  sourceField: null,
  sourceLanguage : null,

  //for page settings and widgets
  listItemIndex : -1, //position in array
  mediaType : null ,  //difference between types
}

function imagesReducer(state = initialState, action) {

    //const {fields, translations} = state;

    switch(action.type) {
        case IMAGE_SELECT :
            return {
                ...state,
                displayModal : true,
                sourceField : action.payload.identifier,
                sourceLanguage : action.payload.language,
                listItemIndex : action.payload.listItemIndex,
                mediaType : action.payload.identifier.type
            }
        case IMAGE_CANCEL :
            return {
                ...state,
                displayModal : false,
                sourceField : null,
                sourceLanguage : null,
                listItemIndex : -1,
                mediaType : null
            }

        case UPDATE_IMAGE:
            return {
                ...state,
                displayModal : false,
                sourceField : null,
                sourceLanguage : null,
                listItemIndex : -1,
                mediaType : null
            }

        case UPDATE_PAGE_IMAGE:
            return {
              ...state,
              displayModal : false,
              sourceField : null,
              sourceLanguage : null,
              listItemIndex : -1,
              mediaType : null
            }

        default:
            return state;
    }
}

export default imagesReducer;

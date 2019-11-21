import {
  ELEMENT_PARAMETERS_OPEN_MODAL,
  ELEMENT_PARAMETERS_CLOSE_MODAL,
  ELEMENT_PARAMETERS_UPDATE,
  ELEMENT_PARAMETERS_CLEAR,
  ELEMENT_PARAMETERS_CLOSED
} from '../constants';


const initialState =  {
  field : null,
  display : false,
}

function appReducer(state = initialState, action) {

    switch(action.type) {

        case ELEMENT_PARAMETERS_OPEN_MODAL :

            var parameter = action.payload;

            return {
              ...state,
              field : parameter,
              display : true
            }

        case ELEMENT_PARAMETERS_CLOSE_MODAL :

            return {
              ...state,
              display : false
            }

        case ELEMENT_PARAMETERS_UPDATE :

            return {
              field : action.payload,
              ...state
            }
        case ELEMENT_PARAMETERS_CLOSED :
            return {
              ...state,
              field : null
            }

        default:
            return state;
    }
}

export default appReducer;

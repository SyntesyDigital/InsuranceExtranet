import {
  VALIDATION_START,
  VALIDATION_DONE,
  VALIDATION_ERROR,
  VALIDATION_SKIP
} from '../constants';

const initialState =  {
  validating : false,
  done : false,
  message : ''
}

function validationReducer(state = initialState, action) {

    //console.log("function validationReducer :: ",action.type, action.payload);

    switch(action.type) {

        case VALIDATION_START : 
          return {
            ...state,
            validating : true,
            done : false,
            message : ''
          }
        case VALIDATION_SKIP : 
          return {
            ...state,
            validating : false,
            done : true,
            message : ''
          }
        case VALIDATION_DONE :
          return {
              ...state,
              validating : false,
              done : true,
              message : action.payload
          }
        case VALIDATION_ERROR :
          return {
              ...state,
              validating : false,
              done : false,
              message : action.payload
          }

        default:
            return state;
    }
}

export default validationReducer;

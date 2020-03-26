import {
  PRELOAD_DONE,
  PRELOAD_FORM_ERROR
} from '../constants';

const initialState =  {
  done : false,
  values : null
}

function preloadReducer(state = initialState, action) {

    //console.log("function preloadReducer :: ",action.type, action.payload);

    switch(action.type) {
        
        case PRELOAD_DONE :
          return {
              ...state,
              done : true,
              values : action.payload
          }
        case PRELOAD_FORM_ERROR :
          return {
              ...state,
              done : true,
              values : null
          }

        default:
            return state;
    }
}

export default preloadReducer;

import {
  //INIT_STATE,

} from '../constants';

const initialState =  {
  //procedures : [],
  
}

function formReducer(state = initialState, action) {

    //console.log("formReducer :: ",action.type, action.payload);

    switch(action.type) {
        case INIT_STATE:

            return {
                ...state
            }

        
        default:
            return state;
    }
}

export default formReducer;

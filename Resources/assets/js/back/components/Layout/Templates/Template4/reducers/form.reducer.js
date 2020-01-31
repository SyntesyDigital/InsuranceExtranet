import {
  INIT_STATE,
} from '../constants';

const initialState =  {
  loaded : false
}

function formReducer(state = initialState, action) {

    console.log("formReducer :: ",action.type, action.payload);

    switch(action.type) {
        case INIT_STATE:

            return {
                ...state,
                loaded : true
            }

        
        default:
            return state;
    }
}

export default formReducer;

import {combineReducers} from 'redux';
import formReducer from './form.reducer';
import parametersReducer from './parameters.reducer';

export default combineReducers({
    form: formReducer,
    parameters : parametersReducer,
});

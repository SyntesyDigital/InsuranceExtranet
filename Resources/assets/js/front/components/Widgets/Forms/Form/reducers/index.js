import {combineReducers} from 'redux';
import formReducer from './form.reducer';
import parametersReducer from './parameters.reducer';
import preloadReducer from './preload.reducer';

export default combineReducers({
    form: formReducer,
    parameters : parametersReducer,
    preload : preloadReducer
});

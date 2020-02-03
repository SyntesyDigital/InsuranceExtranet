import {combineReducers} from 'redux';
import formReducer from './form.reducer';
import permissionReducer from './permission.reducer';

export default combineReducers({
    form: formReducer,
    modalPermission : permissionReducer
});

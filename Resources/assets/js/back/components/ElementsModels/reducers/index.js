import {combineReducers} from 'redux';
import formReducer from './form.reducer';
import tableReducer from './table.reducer';

export default combineReducers({
    form: formReducer,
    table: tableReducer
});

import {combineReducers} from 'redux';
import templateReducer from './template.reducer';

export default combineReducers({
    template: templateReducer
});

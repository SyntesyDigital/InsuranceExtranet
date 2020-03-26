import {combineReducers} from 'redux';
import templateReducer from './template.reducer';
import modalItemReducer from './modalItem.reducer.js';

export default combineReducers({
    template: templateReducer,
    modalItem : modalItemReducer
});

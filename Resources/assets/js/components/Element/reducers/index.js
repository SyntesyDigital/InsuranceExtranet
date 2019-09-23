import {combineReducers} from 'redux';
import appReducer from './app.reducer';
import contentsReducer from './contents.reducer';
import fontawesomeReducer from './fontawesome.reducer';

export default combineReducers({
    app: appReducer,
    contents: contentsReducer,
    fontawesome : fontawesomeReducer
});

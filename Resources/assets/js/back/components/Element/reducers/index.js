import {combineReducers} from 'redux';
import appReducer from './app.reducer';
import contentsReducer from './contents.reducer';
import fontawesomeReducer from './fontawesome.reducer';
import elementParametersReducer from './elementParameters.reducer';
import elementsReducer from './elements.reducer';
import templateReducer from './template.reducer';

export default combineReducers({
    app: appReducer,
    contents: contentsReducer,
    fontawesome : fontawesomeReducer,
    elementParameters : elementParametersReducer,
    elements : elementsReducer,
    template: templateReducer
});

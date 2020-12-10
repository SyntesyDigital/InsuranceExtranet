import {combineReducers} from 'redux';
import appReducer from './app.reducer';
import contentsReducer from './contents.reducer';
import fontawesomeReducer from './fontawesome.reducer';
import elementParametersReducer from './elementParameters.reducer';
import elementsReducer from './elements.reducer';
import creaticIconsReducer from './creaticIcons.reducer';

export default combineReducers({
    app: appReducer,
    contents: contentsReducer,
    fontawesome : fontawesomeReducer,
    creatic : creaticIconsReducer,
    elementParameters : elementParametersReducer,
    elements : elementsReducer,
});

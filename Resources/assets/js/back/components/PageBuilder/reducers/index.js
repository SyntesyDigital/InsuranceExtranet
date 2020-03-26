import {combineReducers} from 'redux';
import appReducer from './app.reducer';
import fontawesomeReducer from './fontawesome.reducer';
import imagesReducer from './images.reducer';
import contentsReducer from './contents.reducer';
import modalItemReducer from './modalItem.reducer';
import modalSettingsReducer from './modalSettings.reducer';
import modalEditReducer from './modalEdit.reducer';
import modalEditListReducer from './modalEditList.reducer';
import modalLayoutReducer from './modalLayout.reducer';

export default combineReducers({
    app: appReducer,
    fontawesome : fontawesomeReducer,
    images : imagesReducer,
    contents : contentsReducer,
    modalItem : modalItemReducer,
    modalSettings : modalSettingsReducer,
    modalEdit : modalEditReducer,
    modalEditList : modalEditListReducer,
    modalLayout : modalLayoutReducer
});

import {createStore, applyMiddleware} from 'redux';
import Reducers from './reducers';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

function configureStore() {
    let store = createStore(Reducers, applyMiddleware(thunk, logger))
    return store;
}

export default configureStore;

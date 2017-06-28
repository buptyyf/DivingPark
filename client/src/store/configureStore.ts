import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger, {createLogger} from 'redux-logger';
import RootReducer from '../reducers'

const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, logger];
const finalCreateStore = compose(
    applyMiddleware(...middleware)
)(createStore);

export default function configureStore(initialState?: Object) {
    const store = finalCreateStore(RootReducer, initialState);

    return store;
}
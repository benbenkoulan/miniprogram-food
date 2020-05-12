import { createStore, applyMiddleware } from 'redux';
import { promiseMiddleware } from 'redux-actions-helper';
import logger from 'redux-logger';

import reducer from './reducer';

if (!window.$$global.store) {
    const middlewares = [promiseMiddleware];
    if (process.env.isDev) {
        middlewares.push(logger);
    }
    const store = createStore(reducer, applyMiddleware(...middlewares));
    window.$$global.store = store;
    // console.log(store);
}

export default window.$$global.store;

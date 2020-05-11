import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';

import reducer from './reducer';

if (!window.$$global.store) {
    const store = createStore(reducer, applyMiddleware(logger));
    window.$$global.store = store;
    // console.log(store);
}

export default window.$$global.store;

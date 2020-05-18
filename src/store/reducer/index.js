import { combineReducers } from 'redux';

import app from './app';
import user from './user';
import cookbook from './cookbook';

export default combineReducers({
    app,
    user,
    cookbook,
});

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions-helper';

import { authorize, getSetting } from '../action/user';

const getInitialState = () => ({
    setting: {
        userInfo: false,
    },
});

const setting = handleActions({
    [authorize]: (state) => ({
        ...state,
        userInfo: true,
    }),
    [getSetting.success]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
}, getInitialState().setting);

export default combineReducers({
    setting,
});

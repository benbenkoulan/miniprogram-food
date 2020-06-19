import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions-helper';

import {
    showAuthorizeModal,
    hideAuthorizeModal,
    saveActionAfterAuthorized,
    clearActionAfterAuthorized
} from '../action/app';

const getInitialState = () => ({
    shouldShowAuthorizeModal: false,
    actionAfterAuthorized: null,
});

const shouldShowAuthorizeModal = handleActions({
    [showAuthorizeModal]: () => true,
    [hideAuthorizeModal]: () => false,
}, getInitialState().shouldShowAuthorizeModal);

const actionAfterAuthorized = handleActions({
    [saveActionAfterAuthorized]: (state, { payload }) => ({
        args: payload.args,
        method: payload.method,
    }),
    [clearActionAfterAuthorized]: () => null,
}, getInitialState().actionAfterAuthorized);

export default combineReducers({
    shouldShowAuthorizeModal,
    actionAfterAuthorized
});

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions-helper';

import { showAuthorizeModal, hideAuthorizeModal } from '../action/app';

const getInitialState = () => ({
    shouldShowAuthorizeModal: false,
});

const shouldShowAuthorizeModal = handleActions({
    [showAuthorizeModal]: () => true,
    [hideAuthorizeModal]: () => false,
}, getInitialState().shouldShowAuthorizeModal);


export default combineReducers({
    shouldShowAuthorizeModal
});

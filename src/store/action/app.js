import { createAction, createActionPrefix } from 'redux-actions-helper';

const ACTION_TYPE_CREATOR = createActionPrefix('APP');

export const showAuthorizeModal = createAction(
    ACTION_TYPE_CREATOR('SHOW_AUTHORIZE_MODAL'),
);

export const hideAuthorizeModal = createAction(
    ACTION_TYPE_CREATOR('HIDE_AUTHORIZE_MODAL'),
);

export const saveActionAfterAuthorized = createAction(
    ACTION_TYPE_CREATOR('SAVE_ACTION_AFTER_AUTHORIZED'),
);

export const clearActionAfterAuthorized = createAction(
    ACTION_TYPE_CREATOR('CLEAR_ACTION_AFTER_AUTHORIZED'),
);

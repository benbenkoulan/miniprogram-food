import { createAction, createThunkAction, createActionPrefix } from 'redux-actions-helper';

import { getSetting as wxGetSetting } from '~/modules/miniprogram/setting';

const ACTION_TYPE_CREATOR = createActionPrefix('USER');

export const authorize = createAction(
    ACTION_TYPE_CREATOR('AUTHORIZE'),
);

export const getSetting = createAction(
    ACTION_TYPE_CREATOR('GET_SETTING'),
    wxGetSetting,
);

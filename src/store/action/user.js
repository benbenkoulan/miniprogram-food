import { createAction, createActionPrefix } from 'redux-actions-helper';

import { getSetting as wxGetSetting } from '~/modules/miniprogram/setting';
import * as Api from '~/api';

const ACTION_TYPE_CREATOR = createActionPrefix('USER');

export const authorize = createAction(
    ACTION_TYPE_CREATOR('AUTHORIZE'),
);

export const getSetting = createAction(
    ACTION_TYPE_CREATOR('GET_SETTING'),
    wxGetSetting,
);

export const getDrafts = createAction(
    ACTION_TYPE_CREATOR('GET_DRAFTS'),
    async (data) => {
        const { content } = await Api.getDrafts(data);
        return content;
    },
);

export const deleteDrafts = createAction(
    ACTION_TYPE_CREATOR('DELETE_DRAFTS'),
    async (draftIds) => {
        await Api.deleteDrafts(draftIds);
        return draftIds;
    },
);

export const saveDraft = createAction(
    ACTION_TYPE_CREATOR('SAVE_DRAFT'),
    async (draft) => {
        const { data } = await Api.saveDraft(draft);
        return data;
    },
);

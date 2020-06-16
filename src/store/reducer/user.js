import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions-helper';

import {
    authorize,
    getSetting,
    getDrafts,
    deleteDrafts,
    saveDraft,
} from '../action/user';

const getInitialState = () => ({
    setting: {
        userInfo: false,
    },
    drafts: [],
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

const drafts = handleActions({
    [getDrafts.success]: (state, action) => action.payload,
    [deleteDrafts.success]: (preDrafts, action) => {
        const draftIds = action.payload || [];
        console.log(action);
        return preDrafts.filter(draft => !draftIds.includes(draft.id));
    },
    [saveDraft.success]: (preDrafts, action) => {
        const draft = action.payload;
        if (!draft.id) {
            return [
                ...preDrafts,
                draft,
            ];
        }
        return preDrafts.map(preDraft => preDraft.id === draft.id ? draft : preDraft);
    },
}, getInitialState().drafts);

export default combineReducers({
    setting,
    drafts,
});

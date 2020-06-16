import request from '~/modules/request';
import { send } from '~/modules/request/proxy';

export const getStatisticsInfo = () => send('getStatisticsInfo');

export const getIsAuthorized = () => request('getIsAuthorized');

export const upsertUserInfo = (encryptedData, iv) => send('upsertUserInfo', { data: { encryptedData, iv } });

export const getCategories = () => send('getCategories');

export const deleteDrafts = (ids) => send('deleteDrafts', { data: ids, });

export const getDrafts = (data) => send('getDrafts', { data });

export const saveDraft = (data) => send('saveCookbook', { data: {
    ...data,
    isPublish: 0,
} });
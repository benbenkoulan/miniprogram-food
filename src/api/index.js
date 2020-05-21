import request from '~/modules/request';
import { send } from '~/modules/request/proxy';

export const getStatisticsInfo = () => send('getStatisticsInfo');

export const getIsAuthorized = () => request('getIsAuthorized');

export const upsertUserInfo = (encryptedData, iv) => send('upsertUserInfo', { data: { encryptedData, iv } });

export const getCategories = () => send('getCategories');

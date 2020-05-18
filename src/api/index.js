import request from '../modules/request';
import requestProxy, { send } from '../modules/request/proxy';

export const getStatisticsInfo = () => requestProxy('getStatisticsInfo');

export const upsertUserInfo = (encryptedData, iv) => requestProxy('upsertUserInfo', { data: { encryptedData, iv } });

export const getCategories = () => send('getCategories');
import { send } from '../modules/request/proxy';

export const getStatisticsInfo = () => send('getStatisticsInfo');

export const upsertUserInfo = (encryptedData, iv) => send('upsertUserInfo', { data: { encryptedData, iv } });

export const getCategories = () => send('getCategories');
import request from '../modules/request';
import requestProxy from '../modules/request/proxy';

export const getStatisticsInfo = () => requestProxy('getStatisticsInfo');

export const upsertUserInfo = (encryptedData, iv) => requestProxy('upsertUserInfo', { data: { encryptedData, iv } });

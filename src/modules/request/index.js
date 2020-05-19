import Axios from 'axios';

import { BASE_REQUEST_URL } from '~/modules/constant/network';

import getService from './service';

const axios = Axios.create({
    baseURL: BASE_REQUEST_URL,
    timeout: 10000,
    validateStatus: (status) => (status >= 200 && status < 300) || status === 401,
});

export default async (serviceName, { data = {} } = {}) => {
    const { url, method } = getService(serviceName) || {};
    if (!url) {
        throw new Error(`没有${serviceName}服务`);
    }

    const config = {
        url,
        method,
    }

    if (method === 'GET') {
        config.params = data;
    } else {
        config.data = data;
    }

    const res = await axios.request(config);
    return res;
}

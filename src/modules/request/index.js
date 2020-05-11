import Axios from 'axios';

import getService from './service';

const BASE_URL = 'http://4b19a2e8.ngrok.io';

const axios = Axios.create({
    baseURL: BASE_URL,
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

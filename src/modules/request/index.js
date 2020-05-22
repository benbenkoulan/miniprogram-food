import Axios from 'axios';

import { BASE_REQUEST_URL } from '~/modules/constant/network';

import getService from './service';

const axios = Axios.create({
    baseURL: BASE_REQUEST_URL,
    timeout: 30000,
    validateStatus: (status) => (status >= 200 && status < 300) || status === 401,
});

const getParamsWithoutPathQuery = (url, data) => {
    const pathQueryRegxp = /{([^{}]+)}/g;
    const matches = url.match(pathQueryRegxp);
    if (!matches) return data;
    return Object.keys(data).reduce((params, key) => {
        if (!matches.includes(`{${key}}`)) {
            return {
                ...params,
                [key]: data[key],
            };
        }
        return params;
    }, {});
}

export default async (serviceName, { data = {} } = {}) => {
    const { url, method } = getService(serviceName) || {};
    if (!url) {
        throw new Error(`没有${serviceName}服务`);
    }

    const processedURL = url.replace(/{([^{}]+)}/g, (match, p1) => data[p1]);

    const params = getParamsWithoutPathQuery(url, data);

    const config = {
        url: processedURL,
        method,
    }

    if (method === 'GET') {
        config.params = params;
    } else {
        config.data = params;
    }

    const res = await axios.request(config);
    return res;
}

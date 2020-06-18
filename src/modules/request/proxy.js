import router, { getCurrentPage } from '~/router';
import request from '../request';
import login from '../login';

import withLoading from '../hof/withLoading';
import withReLogin from '../hof/withReLogin';

export const fetch = async (serviceName, { data = {} } = {}) => {
    const currentPage = getCurrentPage();
    const { data: res, status } = await request(serviceName, { data });
    if (status === 401) {
        // await login();
        // if (currentPage.isTab) {
        //     router.reLaunch(currentPage.name);
        // } else {
        //     router.replace(currentPage.name, currentPage.query);
        // }
        throw new Error(status);
    }
    return res;
};

export const send = withLoading(withReLogin(fetch));

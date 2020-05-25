import router from '~/router';
import request from '../request';
import login from '../login';
import withLoading from '../hof/withLoading';

export const send = withLoading(async (serviceName, { data = {} } = {}) => {
    const { data: res, status } = await request(serviceName, { data });
    if (status === 401) {
        await login();
        router.reLaunch('home');
        throw new Error({ status, message: 'not login'});
    }
    return res;
});

export const fetch = async (...args) => {
    const { data } = await request(...args);
    return data;
};

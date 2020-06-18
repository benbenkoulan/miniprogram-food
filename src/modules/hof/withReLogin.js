import { wxLogin } from '~/modules/login';

export default (asyncFunc) => async (...args) => {
    let result;
    try {
        result = await asyncFunc(...args);
    } catch (e) {
        console.log('---err----', e.message);
        if (e.message === '401') {
            await wxLogin();
            result = await asyncFunc(...args);
        }
    }
    console.log('result: ', result);
    return result;
};

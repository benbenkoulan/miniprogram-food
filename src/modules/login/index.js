import withLoading from '~/modules/hof/withLoading';
import request from '../request';

const login = () => {
    return new Promise((resolve) => {
        wx.login({
            success: async ({ code }) => {
                console.log(code);
                const res = await request('login', { data: { code } });
                console.log(res);
                resolve(res);
            }
        })
    })
};

export default withLoading(login, { title: '登陆中', mask: true });

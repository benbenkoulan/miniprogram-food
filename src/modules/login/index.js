import withLoading from '~/modules/hof/withLoading';
import request from '../request';

export const wxLogin = () => {
    return new Promise((resolve) => {
        wx.login({
            success: async ({ code }) => {
                console.log(code);
                const res = await request('login', { data: { code } });
                resolve(res);
            }
        })
    })
};

export default withLoading(wxLogin, { title: '登陆中', mask: true });

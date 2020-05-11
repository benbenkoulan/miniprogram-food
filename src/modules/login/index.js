import request from '../request';

export default () => {
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
}

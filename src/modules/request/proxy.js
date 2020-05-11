import request from '../request';
import login from '../login';

export default async (serviceName, { data = {} } = {}) => {
    wx.showLoading();
    const { data: res, status } = await request(serviceName, { data });
    if (status === 401) {
        login()
        .then(() => {
            wx.redirectTo({
                url: 'pages/my/index'
            });
        })
        .catch(() => {
            wx.redirectTo({
                url: 'pages/my/index'
            });
        })
    }
    wx.hideLoading();
    return res;
}

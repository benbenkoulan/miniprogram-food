export default (asyncFunc, { title = '', mask = true } = {}) => (...args) => (new Promise((resolve, reject) => {
    wx.showLoading({ title, mask });
    asyncFunc(...args)
    .then((...resolveArgs) => {
        wx.hideLoading();
        resolve(...resolveArgs);
    })
    .catch((err) => {
        wx.hideLoading();
        reject(err);
    });
}));

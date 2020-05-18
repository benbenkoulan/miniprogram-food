export default (asyncFunc, { title = '', mask = true } = {}) => (...args) => (new Promise((resolve, reject) => {
    wx.showLoading({ title, mask });
    asyncFunc(...args)
    .then(resolve)
    .catch(reject)
    .then(() => {
        wx.hideLoading();
    });
}));

export default (filePath) => new Promise((resolve, reject) => {
    wx.uploadFile({
        url: '',
        filePath,
        success: resolve,
        fail: reject
    });
});

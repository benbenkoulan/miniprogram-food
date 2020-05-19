export const chooseImage = ({ sizeType, count = 1 } = {}) => new Promise((resolve, reject) => {
    wx.chooseImage({
        count,
        sizeType,
        success: resolve,
        fail: reject,
    });
});

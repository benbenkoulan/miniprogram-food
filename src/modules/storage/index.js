const set = (key, value) => wx.setStorageSync(key, value);

const get = (key) => wx.getStorageSync(key);

const remove = (key) => wx.removeStorageSync(key);

export default {
    set,
    get,
    remove,
};

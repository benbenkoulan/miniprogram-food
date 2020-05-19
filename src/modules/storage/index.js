const set = (key, value) => {
    try {
        if (typeof value === 'object') {
            wx.setStorageSync(key, JSON.stringify(value))
        } else {
            wx.setStorageSync(key, value);
        }
        
    } catch (e) {
        console.log(e);
    }
}

const get = (key) => {
    try {
        return JSON.parse(wx.getStorageSync(key));
    } catch (e) {
        return wx.getStorageSync(key);
    }
}

const remove = (key) => wx.removeStorageSync(key);

export default {
    set,
    get,
    remove,
};

if (!window.$$global.systemInfo) {
    window.$$global.systemInfo = wx.getSystemInfoSync();
}

export default window.$$global.systemInfo;

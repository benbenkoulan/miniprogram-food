export const getSetting = () => new Promise((resolve) => {
    wx.getSetting({
        success(res) {
            const authSetting = res.authSetting || {};
            const payload = Object.keys(authSetting).reduce((settings, scope) => ({
                ...settings,
                [scope.replace('scope.', '')]: authSetting[scope],
            }), {});
            resolve(payload);
        }
    });
});

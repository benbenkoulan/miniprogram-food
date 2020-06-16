export const showToast = ({
    title,
    icon = 'success',
    mask = true,
    duration = 2000,
}) => (new Promise((resolve, reject) => {    
    wx.showToast({
        title,
        icon,
        mask,
        duration,
        complete: resolve,
        fail: reject,
    });
}));

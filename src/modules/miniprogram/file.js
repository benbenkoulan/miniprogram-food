
import { BASE_REQUEST_URL } from '~/modules/constant/network';
import withLoading from '../hof/withLoading';
import login from '../login';
import router from '~/router';

const uploadFile = ({ filePath, name, } = {}) => new Promise((resolve, reject) => {
    console.log(document.cookie);
    wx.uploadFile({
        url: `${BASE_REQUEST_URL}/services/file/image/upload`,
        name,
        filePath,
        success: async (res) => {
            const { statusCode, data } = res;
            if (statusCode === 401) {
                await login();
                router.switchTab('home');
            }
            resolve(data);
        },
        fail: reject
    });
});

export const upload = withLoading(uploadFile, { title: '上传中' });

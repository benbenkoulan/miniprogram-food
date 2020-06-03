import nullSafeGet from 'lodash/get';
import { BASE_REQUEST_URL } from '~/modules/constant/network';
import storage from '~/modules/storage';
import router from '~/router';
import withLoading from '../hof/withLoading';
import login from '../login';

export const uploadFile = (filePath) => new Promise((resolve, reject) => {
    const pageCookie = storage.get('PAGE_COOKIE')[''];
    const sessionKey = nullSafeGet(pageCookie, '/.SESSION.key');
    const sessionValue = nullSafeGet(pageCookie, '/.SESSION.value');

    wx.uploadFile({
        url: `${BASE_REQUEST_URL}/services/file/image/upload`,
        name: 'imageFile',
        filePath,
        header: {
            cookie: `${sessionKey}=${sessionValue}`,
            'content-type': 'multipart/form-data'
        },
        success: async (res) => {
            const { statusCode, data } = res;
            if (statusCode === 401) {
                await login();
                router.switchTab('home');
            }
            try {
                const result = JSON.parse(data);
                resolve(result);
            } catch (e) {
                reject();
            }            
        },
        fail: reject
    });
});

export const upload = withLoading(uploadFile, { title: '上传中' });

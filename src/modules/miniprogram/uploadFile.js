
import { BASE_REQUEST_URL } from '~/modules/constant/network';
import withLoading from '../hof/withLoading';

const uploadFile = ({ filePath, name, } = {}) => new Promise((resolve, reject) => {
    wx.uploadFile({
        url: `${BASE_REQUEST_URL}/services/file/image/upload`,
        name,
        filePath,
        success: resolve,
        fail: reject
    });
});

export default withLoading(uploadFile, { title: '上传中' });

import createInitPage from '../../modules/page';

import Index from './index';

const initPage = createInitPage(Index);

"undefined" != typeof wx && wx.getSystemInfoSync || initPage()

export default initPage;

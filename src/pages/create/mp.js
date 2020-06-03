import createInitPage from '../../modules/page';

import Index from './index';

const initPage = createInitPage(Index, { shouldShowCreate: false, });

export default initPage;

"undefined" != typeof wx && wx.getSystemInfoSync || initPage()

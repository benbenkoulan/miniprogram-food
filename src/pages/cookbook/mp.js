import createInitPage from '~/modules/page';
import withNavigation from '~/components/navigation';

import Index from './index';

const CookBook = withNavigation(Index, { navigationTitle: '菜谱详情' });

const initPage = createInitPage(CookBook);

export default initPage;

"undefined" != typeof wx && wx.getSystemInfoSync || initPage();

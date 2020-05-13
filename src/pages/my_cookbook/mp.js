import createInitPage from '~/modules/page';
import withNavigation from '~/components/navigation';

import Index from './index';

const MyCookBook = withNavigation(Index, { navigationTitle: '我的菜谱' });

const initPage = createInitPage(MyCookBook);

export default initPage;

"undefined" != typeof wx && wx.getSystemInfoSync || initPage();

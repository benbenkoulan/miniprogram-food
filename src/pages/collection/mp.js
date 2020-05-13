import createInitPage from '~/modules/page';
import withNavigation from '~/components/navigation';

import Index from './index';

const Collection = withNavigation(Index, { navigationTitle: '我的收藏' });

const initPage = createInitPage(Collection);

export default initPage;

"undefined" != typeof wx && wx.getSystemInfoSync || initPage();

import createInitPage from '~/modules/page';
import withNavigation from '~/components/navigation';

import Index from './index';

const MyFollow = withNavigation(Index, { navigationTitle: '我的关注' });

const initPage = createInitPage(MyFollow);

export default initPage;

"undefined" != typeof wx && wx.getSystemInfoSync || initPage();

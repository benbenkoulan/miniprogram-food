import createInitPage from '../../modules/page';
import withNavigation from '../../components/navigation';

import Index from './index';

const My = withNavigation(Index, { navigationTitle: '我的' });

const initPage = createInitPage(My);

export default initPage;

"undefined" != typeof wx && wx.getSystemInfoSync || initPage();

import createInitPage from '../../modules/page';
import withNavigation from '../../components/navigation';

import Index from './index';

// const Create = withNavigation(Index, { showCreate: false, navigationTitle: '创建菜谱' });

const initPage = createInitPage(Index, { shouldShowCreate: false, });

export default initPage;

"undefined" != typeof wx && wx.getSystemInfoSync || initPage()

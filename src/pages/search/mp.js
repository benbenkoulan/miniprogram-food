import createInitPage from '../../modules/page';
import withNavigation from '../../components/navigation';

import Index from './index';

const Search = withNavigation(Index, { navigationTitle: '搜索菜谱' });

const initPage = createInitPage(Search);

export default initPage;

"undefined" != typeof wx && wx.getSystemInfoSync || initPage();

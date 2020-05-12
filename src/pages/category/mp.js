import createInitPage from '../../modules/page';
import withNavigation from '../../components/navigation';

import Index from './index';

const Category = withNavigation(Index, { navigationTitle: '菜谱分类' });

const initPage = createInitPage(Category);

export default initPage;

"undefined" != typeof wx && wx.getSystemInfoSync || initPage()

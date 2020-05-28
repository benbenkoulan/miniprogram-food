import createInitPage from '../../modules/page';
import withNavigation from '../../components/navigation';

import Index from './index';

// const Home = withNavigation(Index);

const initPage = createInitPage(Index);

"undefined" != typeof wx && wx.getSystemInfoSync || initPage()

export default initPage;

import getRoute from './routes';
import { stringify } from 'query-string';

const wrapperRoute = (pageName, callback) => {
    const route = getRoute(pageName);
    callback(route);
}

export const getPageCount = () => getCurrentPages().length;

const push = (pageName, query) => wrapperRoute(pageName, (route) => {
    const url = `${route.path}${ !query ? '' : `?${stringify(query)}`}`;
    console.log(pageName, query, url);
    wx.navigateTo({
        url,
    });
});

const reLaunch = (pageName, query) => wrapperRoute(pageName, (route) => {
    const url = `${route.path}${ !query ? '' : `?${stringify(query)}`}`;
    console.log(pageName, query, url);
    wx.reLaunch({
        url,
    });
});

const back = ({ delta = 1, } = {}) => wx.navigateBack({ delta });

const switchTab = (pageName) => wrapperRoute(pageName, (route) => wx.switchTab({
    url: route.path
}));

export default {
    push,
    back,
    reLaunch,
    switchTab,
};

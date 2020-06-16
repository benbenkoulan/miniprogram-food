import getRoute from './routes';
import { stringify } from 'query-string';

export const getCurrentPage = () => {
    const currentPages = getCurrentPages();
    const currentPage = currentPages.pop();
    const route = getRoute(`/${currentPage.route}`, 'path');
    return {
        ...route,
        query: currentPage.query,
    };
};

export const getPageCount = () => getCurrentPages().length;

const wrapperRoute = (pageName, callback) => {
    const route = getRoute(pageName);
    callback(route);
}

const push = (pageName, query) => wrapperRoute(pageName, (route) => {
    const url = `${route.path}${ !query ? '' : `?${stringify(query)}`}`;
    console.log(pageName, query, url);
    wx.navigateTo({
        url,
    });
});

const replace = (pageName, query) => wrapperRoute(pageName, (route) => {
    const url = `${route.path}${ !query ? '' : `?${stringify(query)}`}`;
    console.log(pageName, query, url);
    wx.redirectTo({
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
    replace,
    reLaunch,
    switchTab,
};

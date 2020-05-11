import getRoute from './routes';
import { stringify } from 'query-string';

const wrapperRoute = (pageName, callback) => {
    const route = getRoute(pageName);
    callback(route);
}

export const getPageCount = () => getCurrentPages().length;

const push = (pageName, query) => wrapperRoute(pageName, (route) => {
    const url = `${route.path}${ query ? '' : `?${stringify({ query, })}`}`;
    wx.navigateTo({
        url,
    });
});

const back = ({ delta = 1, } = {}) => wx.navigateBack({ delta });

export default {
    push,
    back,
};

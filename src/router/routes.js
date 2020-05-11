const routes = [{
    name: 'search',
    path: '/pages/search/index',
    tab: false,
}, {
    name: 'create',
    path: '/pages/create/index',
    tab: false,
}];

export default (pageName) => routes.find(route => route.name === pageName);

const routes = [{
    name: 'search',
    path: '/pages/search/index',
}, {
    name: 'create',
    path: '/pages/create/index',
}, {
    name: 'my_cookbook',
    path: '/pages/my_cookbook/index',
}, {
    name: 'collection',
    path: '/pages/collection/index',
}, {
    name: 'cookbook',
    path: '/pages/cookbook/index',
}];

export default (pageName) => routes.find(route => route.name === pageName);

const routes = [{
    name: 'home',
    path: '/pages/home/index'
}, {
    name: 'my',
    path: '/pages/my/index'
}, {
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
}, {
    name: 'my_follow',
    path: '/pages/my_follow/index',
},];

export default (pageName) => routes.find(route => route.name === pageName);

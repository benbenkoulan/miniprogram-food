const routes = [{
    name: 'home',
    path: '/pages/home/index',
    // title: '主页'
}, {
    name: 'my',
    path: '/pages/my/index',
    title: '我的'
}, {
    name: 'search',
    path: '/pages/search/index',
    title: '搜索菜谱'
}, {
    name: 'create',
    path: '/pages/create/index',
    title: '创建菜谱'
}, {
    name: 'my_cookbook',
    path: '/pages/my_cookbook/index',
    title: '我的菜谱'
}, {
    name: 'collection',
    path: '/pages/collection/index',
    title: '我的收藏'
}, {
    name: 'cookbook',
    path: '/pages/cookbook/index',
    title: '菜谱详情'
}, {
    name: 'my_follow',
    path: '/pages/my_follow/index',
    title: '我的关注'
},];

export default (pageName) => routes.find(route => route.name === pageName);

const routes = [{
    name: 'home',
    path: '/pages/home/index',
    // title: '主页'
    isTab: true,
}, {
    name: 'my',
    path: '/pages/my/index',
    // title: '我的'
    isTab: true,
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
    title: '关注列表'
}, {
    name: 'category',
    path: '/pages/category/index',
    // title: '菜谱分类'
}, {
    name: 'my_draft',
    path: '/pages/my_draft/index',
    title: '草稿箱'
}, {
    name: 'user_home',
    path: '/pages/user_home/index',
    title: '个人主页'
}]

export default (pageName, propertyName = 'name') => routes.find(route => route[propertyName] === pageName);

const services = [
    { name: 'getCategories', url: '/services/category', method: 'GET' },
    { name: 'login', url: '/services/user/login', method: 'POST' },
    { name: 'getStatisticsInfo', url: '/services/user/statistics-info', method: 'GET' },
    { name: 'upsertUserInfo', url: '/services/user', method: 'POST' },
    { name: 'saveCookbook', url: '/services/product', method: 'POST' },
    { name: 'getMyCookbooks', url: '/services/product/my-products', method: 'GET' },
    { name: 'getCookbookDetail', url: '/services/product/11', method: 'GET'},
    { name: 'searchCookbooks', url: '/services/product', method: 'GET' },
    { name: 'getIsAuthorized', url: '/services/user/authorization', method: 'GET' },
];

export default (serviceName) => services.find(service => service.name === serviceName);

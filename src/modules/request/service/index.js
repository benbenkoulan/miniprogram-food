const services = [
    { name: 'getCategories', url: '/services/category', method: 'GET' },
    { name: 'login', url: '/services/user/login', method: 'POST' },
    { name: 'getStatisticsInfo', url: '/services/user/statistics-info', method: 'GET' },
    { name: 'upsertUserInfo', url: '/services/user', method: 'POST' },
    { name: 'saveCookbook', url: '/services/product', method: 'POST' },
    { name: 'getMyCookbooks', url: '/services/product/my-products', method: 'GET' },
    { name: 'getCookbookDetail', url: '/services/product/{id}', method: 'GET'},
    { name: 'searchCookbooks', url: '/services/product', method: 'GET' },
    { name: 'getIsAuthorized', url: '/services/user/authorization', method: 'GET' },
    { name: 'upsertAttention', url: '/services/user/attention', method: 'POST'},
    { name: 'upsertCollection', url: '/services/user/collection', method: 'POST'},
    { name: 'getMyFollows', url: '/services/user/my-attentions', method: 'GET' },
    { name: 'getUserFollows', url: '/services/user/{userId}/attentions', method: 'GET' },
    { name: 'getMyCollections', url: '/services/user/my-collections', method: 'GET' },
    { name: 'getDrafts', url: '/services/product/my-drafts', method: 'GET' },
    { name: 'getOtherUserInfo', url: '/services/user/{userId}/statistics-info', method: 'GET' },
    { name: 'getOtherUserCollection', url: '/services/user/{userId}/collections', method: 'GET' },
    { name: 'getOtherUserProduct', url: '/services/user/{userId}/products', method: 'GET' },
    { name: 'deleteDrafts', url: '/services/product/drafts', method: 'DELETE' },
];

export default (serviceName) => services.find(service => service.name === serviceName);

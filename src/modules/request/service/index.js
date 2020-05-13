const services = [
    { name: 'getCategories', url: '/services/category', method: 'GET' },
    { name: 'login', url: '/services/user/login', method: 'POST' },
    { name: 'getStatisticsInfo', url: '/services/user/statistics-info', method: 'GET' },
    { name: 'upsertUserInfo', url: '/services/user', method: 'POST' },
    { name: 'uploadImage', url: '/services/file/image/upload', method: 'POST' }
];

export default (serviceName) => services.find(service => service.name === serviceName);

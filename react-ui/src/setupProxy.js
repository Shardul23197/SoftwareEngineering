const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function (app) {
    app.use(proxy(`/auth/*`, { target: 'https://fitocity.herokuapp.com' }));
    app.use(proxy(`/api/*`, { target: 'https://fitocity.herokuapp.com' }));
};
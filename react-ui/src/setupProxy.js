const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function (app) {
    app.use(proxy(`/auth/*`, { target: 'htttp://fitocity.herokuapp.com' }));
};
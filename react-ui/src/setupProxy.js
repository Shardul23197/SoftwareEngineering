const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function (app) {
    app.use(proxy(`/auth/*`, { target: 'http://arcane-oasis-13539.herokuapp.com' }));
};
const
    Koa = require('koa'),
    Helmet = require('koa-helmet'),
    KoaRouter = require('koa-router'),
    api = require('./api'),
    mw = api.middleware,
    routes = api.routes;

const initServer = async () => {
    await api.initApi();
};

module.exports = {
    init: initServer,
    api: require('./api'),
    config: require('./config'),
    log: require('./log')
};
const
    Koa = require('koa'),
    KoaRouter = require('koa-router'),
    mw = require('./middleware'),
    routes = require('./routes'),
    Config = require('../config'),
    logger = require('../log').getLogger(),
    models = require('./models');

const initApi = async () => {
    const app = new Koa(), router = new KoaRouter({prefix: '/api'});

    await models.init();

    // Listen for errors
    app.on('error', (error, ctx) => {
        logger.warn(`Error encountered: ${error.message}`);
    });

    logger.info('Loading middleware...');

    mw.preRequest.forEach(m => app.use(m));
    mw.postRequest.forEach(m => app.use(m));

    // Load routes
    logger.info('Loading routes...');
    routes(router);

    // Add loaded routes to the app
    app.use(
        router.routes(),
        router.allowedMethods()
    );

    app.use(function *() {
        this.status = 404;
        this.body = {
            status: 404,
            message: 'The requested resource could not be found'
        }
    });

    logger.info(`Listening on port ${Config.get('server').port}`);
    app.listen(Config.get('server').port);

    router.stack.forEach(r => logger.info(`Listening for ${r.path}`));
};

module.exports = {

    initApi: initApi,

    get controllers() {
        return require('./controllers');
    },

    get middleware() {
        return require('./middleware');
    },

    get routes() {
        return require('./routes');
    }

};
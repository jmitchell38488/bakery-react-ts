const
    mw = require('../middleware'),
    KoaRouter = require('koa-router');

const initRoutes = (parentRouter) => {
    const
        routes = ['bakery'];

    routes.forEach(r => {
        const rtr = require('./' + r)();

        parentRouter.use(
            rtr.routes(),
            rtr.allowedMethods()
        );
    });
};

module.exports = (parentRouter) => {
    const router = new KoaRouter({prefix: '/v1'});
    initRoutes(router);

    // Append loaded routes to the main router prefix
    parentRouter.use(
        router.routes(),
        router.allowedMethods()
    );
};
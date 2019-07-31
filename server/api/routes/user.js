const
    mw = require('../middleware'),
    UserController = require('../controllers').User,
    controller = new UserController(),
    cors = require('@koa/cors'),
    ApiResponse = require('../response'),
    ApiError = require('../apierror');

module.exports = () => {
    const router = new require('koa-router')({prefix: '/users'});

    router.get('/', async ctx => {
        ctx.data = controller.find();
    });

    router
        .param('user', async (id, ctx, next) => {
            if (!/^[0-9]+$/.test(id)) {
                return ctx.status = 404;
            }

            let user = controller.findOne(id);

            if (!user) {
                ctx.body = new ApiError(`Could not find user with id ${id}`, 404);
                return ctx.body;
            }

            ctx.data = user;
            return next();
        })
        .get('user', '/:user', cors(), async ctx => {
            ctx.data.url = router.url('user', ctx.data.id);
            ctx.body = new ApiResponse(200);
            ctx.body.data = ctx.data;
        });

    return router;
};
const
    mw = require('../middleware'),
    BakeryController = require('../controllers').Bakery,
    controller = new BakeryController(),
    cors = require('@koa/cors'),
    ApiResponse = require('../response'),
    ApiError = require('../apierror');

module.exports = () => {
    const router = new require('koa-router')({prefix: '/bakery'});

    router.get('/items', cors(), async ctx => {
        ctx.body = controller.all();
    });

    // Route: /order/:sku/:qty
    router
        .param('sku', async (sku, ctx, next) => {
            if (!/^[A-Z0-9]{2,5}$/.test(sku)) {
                ctx.body = new ApiError(400, 'Invalid SKU provided, please check the SKU and try again');
                return ctx.body;
            }

            ctx.sku = sku;
            return next();
        })
        .param('qty', async (qty, ctx, next) => {
            if (!/^[0-9]+$/.test(qty)) {
                ctx.body = new ApiError(400, 'Invalid qty provided, please provide only whole numbers');
                return ctx.body;
            }

            ctx.qty = qty;
            return next();
        })
        .get('order_sku_qty', '/order/:sku/:qty', cors(), async ctx => {
            try {
                let fits = controller.calculateItemQuantityForOrder(ctx.sku, ctx.qty),
                    qty = fits.reduce((acc, obj) => acc + obj.qty, 0),
                    cost = fits.reduce((acc, obj) => acc + obj.cost, 0);

                ctx.body = new ApiResponse(200);
                ctx.body.data = {
                    item: controller.find({sku: ctx.sku}).shift().json,
                    order: {
                        qty: qty,
                        cost: cost.toFixed(2),
                        options: fits
                    }
                }
            } catch (err) {
                ctx.body = new ApiError(`Could not load order basket with sku [${ctx.sku}] and qty [${ctx.qty}]`, 404);
            }
        });

    return router;
};
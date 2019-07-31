const
    ApiResponse = require('../response'),
    ApiError = require('../apierror');

const formatJsonResponse = async(ctx, next) => {
    await next();

    // Format ApiResponse
    if (ctx.body instanceof ApiResponse) {
        ctx.status = ctx.body.status;
        ctx.body = ctx.body.json;

    // Format ApiError
    } else if (ctx.body instanceof ApiError) {
        ctx.status = ctx.body.status;
        let err = {
            status: ctx.body.status,
            message: ctx.body.message
        };

        if (!!ctx.body.data) {
            err.data = ctx.body.data;
        }

        ctx.body = err;
    }
};

module.exports = {
    json: formatJsonResponse
};
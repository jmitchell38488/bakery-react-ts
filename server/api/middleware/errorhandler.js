const
    ApiError = require('../apierror');

const resourceNotFound = async (ctx, next) => {
    await next();
    return ctx.status = 404;
};

const handleError = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        let body = {
            status: 400
        };

        if (error instanceof ApiError) {
            body.message = error.message;
            body.status = error.status;
            if (!!error.data) {
                body.data = error.data;
            }
        } else if (error instanceof Error) {
            body.message = error.message;
        } else {
            body.message = '' + error; // coerce error to string
            error = new ApiError(''+error, 404);
        }

        ctx.body = body;
        ctx.status = body.status;
        ctx.app.emit('error', error, ctx);
    }
};

module.exports = {
    resourceNotFound: resourceNotFound,
    handleError: handleError
};
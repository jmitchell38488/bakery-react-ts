const xResponse = async (ctx, next) => {
    const start = Date.now();
    ctx.requestTime = start;
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
};

module.exports = xResponse;
const logger = require('../../log').getLogger();

const mwLogger = async (ctx, next) => {
    await next();
    const rt = Date.now() - ctx.requestTime;
    logger.info(`${ctx.method} ${ctx.url} - ${rt}ms`);
};

module.exports = mwLogger;
const mimeType = async (ctx, next) => {
    switch (ctx.accepts(['json'])) {
        case 'json': break;
        default: this.throw(404);
    }
    await next();
};

module.exports = mimeType;
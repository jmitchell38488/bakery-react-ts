const headers = async (ctx, next) => {
    let list = [
        {key: 'Cache-Control', value: 'no-cache, public, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'},
        {key: 'Access-Control-Allow-Origin', value: '*'},
        {key: 'Access-Control-Allow-Headers', value: 'Origin, X-Requested-With, Content-Type, Accept'},
        {key: 'Content-Type', value: 'application/json'}
    ];

    await next();
    list.forEach(item => ctx.set(item.key, item.value));
};

module.exports = headers;
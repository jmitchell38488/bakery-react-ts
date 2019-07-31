const
    DataStores = require('./store'),
    AbstractStore = require('./abstractstore');

const storeCache = [];

const getStore = (type) => {
    if (!DataStores.hasStore(type)) {
        throw new Error('Data store type [' + type + '] is not a supported type');
    }

    let store = storeCache.find(cache => cache.type === type);
    if (!store || !(store instanceof AbstractStore)) {
        store = DataStores.factory(type);
        storeCache.push({
            type: type,
            instance: store
        });

        return store;
    }

    return store.instance;
};


module.exports = {
    getStore: getStore
};
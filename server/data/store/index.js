const storeTypes = ['local'];

const storeMap = [
    {type: 'local', class: require('./local')}
];

const hasStoreType = (type) => {
    return ~storeTypes.indexOf(type);
};

const createStore = (type) => {
    if (!hasStoreType(type)) {
        throw new TypeError('Store type [' + type + '] is an invalid store type and is not supported');
    }

    let store = storeMap.find(item => item.type === type);
    return new store.class();
};

module.exports = {
    hasStore: hasStoreType,
    factory: createStore
};
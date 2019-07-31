const models = [
    'bakery'
];

const cache = [];

const init = () => {
    models.forEach(m => {
        let model = require('./' + m);
        cache.push({
            name: m,
            instance: new model()
        });
    });

    // Freeze the cache so that it can't be triggered again
    Object.freeze(cache);
};

module.exports = {

    init: init,

    get BakeryModel() {
        return cache.find(m => m.name === 'bakery');
    }

};
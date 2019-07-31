const isObject = (obj) => (!!obj) && (obj.constructor === Object);
const isArray = (obj) => (!!obj) && (obj.constructor === Array);
const instanceOf = (obj, clazz) => (!!obj) && (obj instanceof clazz);

function *idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

module.exports = {
    isObject: isObject,
    isArray: isArray,
    instanceOf: instanceOf,
    idGenerator: idGenerator
};
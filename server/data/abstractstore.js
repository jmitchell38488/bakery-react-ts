class AbstractStore {

    constructor(type) {
        if (new.target === AbstractStore) {
            throw new TypeError('Cannot instantiate instance of AbstractStore directly, the class must be inherited!');
        }
        this.type = type;
        this.params = [];
    }

    init(params) {
        this.params = params;
    }

}

module.exports = AbstractStore;
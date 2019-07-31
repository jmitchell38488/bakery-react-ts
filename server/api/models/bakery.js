const
    Config = require('../../config'),
    Store = require('../../data').getStore(Config.get('database').client),
    Util = require('../../util');

class BakeryModel {

    getAllItems() {
        return Store.getCatalog().map(i => i.json);
    }

    find(params) {
        // No params
        if (!(!!params) || (Util.isObject(params) && Object.keys(params).length < 1)) {
            return Store.getCatalog();
        }

        // We're not filtering options
        if (!!params.options) {
            return [];
        }

        // Filter
        return Store.getCatalog().filter(s => {
            let found = true;

            Object.keys(params).forEach(k => {
                if (params[k] !== s[k]) {
                    found = false;
                    return false;
                }
            });

            if (found) {
                return s;
            }
        });
    }

}

module.exports = BakeryModel;
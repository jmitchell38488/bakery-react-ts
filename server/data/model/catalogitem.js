const
    CatalogOption = require('./catalogoption'),
    idGenerator = require('../../util').idGenerator();

class CatalogItem {

    constructor(sku, name, options) {
        this.props = {};
        this.props.id = idGenerator.next().value;
        this.props.sku = sku;
        this.props.name = name;
        this.props.options = options;
    }

    get id() {
        return this.props.id;
    }

    get sku() {
        return this.props.sku;
    }

    get name() {
        return this.props.name;
    }

    get options() {
        return this.props.options;
    }

    static fromJson(json) {
        if (json.options === void 0) {
            throw new TypeError('Cannot create instance of CatalogItem from invalid data');
        }

        let options = [];
        json.options.forEach(item => {
            options.push(new CatalogOption(item.qty, item.cost));
        });

        return new CatalogItem(json.sku, json.name, options);
    }

    get json() {
        let raw = {
            id: this.id,
            sku: this.sku,
            name: this.name,
            options: []
        };

        this.options.forEach(o => raw.options.push(o.json));

        return raw;
    }

}

module.exports = CatalogItem;
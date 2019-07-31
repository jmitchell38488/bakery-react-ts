const idGenerator = require('../../util').idGenerator();

class CatalogOption {

    constructor(qty, cost) {
        this.params = {};
        this.params.id = idGenerator.next().value;
        this.params.qty = qty;
        this.params.cost = cost;
    }

    get id() {
        return this.params.id;
    }

    get qty() {
        return this.params.qty;
    }

    get cost() {
        return this.params.cost;
    }

    get json() {
        return {
            id: this.id,
            qty: this.qty,
            cost: this.cost
        };
    }

}

module.exports = CatalogOption;
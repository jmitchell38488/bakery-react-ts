const
    Util = require('../../util');

class BakeryController {

    constructor() {
        this.model = require('../models').BakeryModel.instance;
    }

    all() {
        return this.model.getAllItems();
    }

    find(params) {
        return this.model.find(params);
    }

    calculateItemQuantityForOrder(sku, qty) {
        let items = this.model.find({sku: sku});
        if (items.length < 1) {
            throw new Error(`Cannot find items with sku [${sku}]`)
        }

        let item = items.slice(0, 1)[0];
        let options = item.options
            .map(o => o.json)
            .sort((a, b) => b.qty - a.qty);

        let count = 0, fit = false;
        while (!fit && options.length > 0) {
            if (count > 0) {
                options.shift();
            }

            // Pop an item off the end to try to find the best fit
            fit = this.getFirstFit(options,qty);
            count++;
        }

        if (!Util.isArray(fit) && !fit) {
            throw new Error(`Cannot fulfill order for sku [${sku}] with quantity [${qty}]`);
        }

        return fit;
    }

    getFirstFit(options, qty) {
        let fit = [], remaining = qty;

        // We iterate over each option, trying to fulfill the list
        for (let i = 0; i < options.length; i++) {
            let o = options[i];
            if (remaining % o.qty === 0) {
                for (let j = 0; j < remaining / o.qty; j++) fit.push(o);
                remaining = 0;
                break;
            }

            if (remaining < o.qty) break;

            // Last item, but we still have space left
            if (i + 1 === options.length) {
                if (remaining > 0 && remaining >= o.qty) {
                    if (remaining % o.qty === 0) {
                        for (let j = 0; j < remaining / o.qty; j++) fit.push(o);
                        remaining = 0;
                    }
                }

                break;
            }

            if (o.qty > remaining) {
                continue;
            }

            // Scan ahead to see if we can add this again
            let canAdd = false;

            do {
                for (let j = i + 1; j < options.length; j++) {
                    canAdd = false;

                    // Next item is last in the list
                    if (options.length - 1 === j) {
                        if (o.qty + options[options.length - 1].qty <= remaining) {
                            canAdd = true;
                        }
                    } else {
                        for (let k = options.length - 1; k > j; --k) {
                            let lo = remaining - options[i].qty;
                            if (lo % options[j].qty === 0 || lo % options[k].qty === 0 || (lo >= options[j].qty || lo >= options[k].qty)) {
                                //if (remaining - options[j].qty - options[k].qty > options[i].qty) {
                                canAdd = true;
                                break;
                            }
                        }
                    }

                    if (canAdd) {
                        fit.push(o);
                        remaining -= o.qty;
                    }
                }
            }
            while (canAdd);
        }

        return fit.length > 0 && remaining === 0 ? fit : false;
    }

}

module.exports = BakeryController;
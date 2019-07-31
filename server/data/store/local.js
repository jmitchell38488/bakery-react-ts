const
    AbstractStore = require('../abstractstore'),
    Model = require('../model');


const Storage = {
    Catalog: [
        Model.CatalogItem.fromJson({
            sku: 'VS5',
            name: 'Vegemite scroll',
            options: [
                {qty: 3, cost: 6.99},
                {qty: 5, cost: 8.99}
            ]
        }),
        Model.CatalogItem.fromJson({
            sku: 'MB11',
            name: 'Blueberry Muffin',
            options: [
                {qty: 2, cost: 9.95},
                {qty: 5, cost: 16.95},
                {qty: 8, cost: 24.95}
            ]
        }),
        Model.CatalogItem.fromJson({
            sku: 'CF',
            name: 'Croissant',
            options: [
                {qty: 3, cost: 5.95},
                {qty: 5, cost: 9.95},
                {qty: 9, cost: 16.99}
            ]
        })
    ],
    Orders: []
};

class LocalStore extends AbstractStore {

    constructor() {
        super('local');
    }

    init(params) {
        super.init(params);
    }

    getCatalog() {
        return Storage.Catalog;
    }

}


module.exports = LocalStore;
const BakeryController = require('../../server/api/controllers/bakery');

beforeEach(() => {
    jest.resetModules();
});

describe('testBakeryOrderFunctions', () => {

    it ('should create controller', () => {
        jest.mock('../../server/api/models', () => {
            return {
                BakeryModel: {
                    instance: null
                }
            };
        });

        const controller = new BakeryController();
        expect(typeof controller).toBe('object');
    });

    it ('Calculate VS5 qty 10', () => {
        const data = [{
            sku: 'VS5',
            name: 'Vegemite scroll',
            options: [
                {qty: 3, cost: 6.99, json: {qty: 3, cost: 6.99}},
                {qty: 5, cost: 8.99, json: {qty: 5, cost: 8.99}}
            ]
        }];
        data[0].json = data[0];

        const mockFind = jest.fn();
        mockFind.mockReturnValue(data);

        jest.mock('../../server/api/models', () => {
            return {
                BakeryModel: {
                    instance: {
                        find: mockFind
                    }
                }
            };
        });

        const controller = new BakeryController();
        const order = controller.calculateItemQuantityForOrder('VS5', 10);
        expect(mockFind).toHaveBeenCalled();
        expect(Array.isArray(order)).toBeTruthy();
        expect(order.length).toBe(2);
        expect(order[0].qty).toBe(5);
    });

    it ('Calculate MB11 qty 14', () => {
        const data = [{
            sku: 'MB11',
            name: 'Blueberry Muffin',
            options: [
                {qty: 2, cost: 9.95, json: {qty: 2, cost: 9.95}},
                {qty: 5, cost: 16.95, json: {qty: 5, cost: 16.95}},
                {qty: 8, cost: 24.95, json: {qty: 8, cost: 24.95}}
            ]
        }];
        data[0].json = data[0];

        const mockFind = jest.fn();
        mockFind.mockReturnValue(data);

        jest.mock('../../server/api/models', () => {
            return {
                BakeryModel: {
                    instance: {
                        find: mockFind
                    }
                }
            };
        });

        const controller = new BakeryController();
        const order = controller.calculateItemQuantityForOrder('MB11', 14);
        expect(mockFind).toHaveBeenCalled();
        expect(Array.isArray(order)).toBeTruthy();
        expect(order.length).toBe(4);
        expect(order[0].qty).toBe(8);
    });

});

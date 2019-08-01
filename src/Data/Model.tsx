import {IApiCatalogResponse, IApiOrderResponse, ICatalogItem, IOrder} from "./Catalog";

const API_URL: string = 'http://localhost:3001/api/v1/';

export interface ICatalogModel {
    loadCatalog(): Promise<void>;
    getCatalogItems(): Promise<ICatalogItem[]>;
    getBakeryOrder(sku: string, qty: number): Promise<IOrder>;
    getCatalogItem(sku: string): Promise<ICatalogItem | undefined>;
}

export default class Model implements ICatalogModel {

    protected orders: IOrder[] = [];
    protected catalog: ICatalogItem[] = [];
    protected loading: boolean = false;

    public async loadCatalog(): Promise<void> {
        this.loading = true;

        const response: Response = await fetch(API_URL + 'bakery/items', {
            method: 'GET',
            mode: 'cors'
        });

        const apiData: IApiCatalogResponse = await response.json();

        if (apiData.status !== 200) {
            console.error(apiData.message);
            throw new Error('Could not fetch catalog items');
        }

        this.catalog = apiData.list as ICatalogItem[];
    }

    public async getCatalogItems(): Promise<ICatalogItem[]> {
        return await this.loadCatalog()
            .then(() => this.catalog as ICatalogItem[])
            .catch(err => {
                console.error(err.message);
                return [];
            });

    }

    public async getBakeryOrder(sku: string, qty: number): Promise<IOrder> {
        const response: Response = await fetch(API_URL + 'bakery/order/' + sku + '/' + qty, {
            method: 'GET',
            mode: 'cors'
        });

        const apiData: IApiOrderResponse = await response.json();

        if (apiData.status !== 200) {
            console.error(apiData.message);
            throw new Error('Could not fetch bakery order');
        }

        return apiData.data as IOrder;
    }

    public async getCatalogItem(sku: string): Promise<ICatalogItem | undefined> {
        if (this.catalog.length < 1) {
            return await this.loadCatalog()
                .then(() => this.catalog.find(i => i.sku === sku) as ICatalogItem)
                .catch(err => {
                    console.error(err.message);
                    return undefined;
                });
        }

        return this.catalog.find(i => i.sku === sku) as ICatalogItem;
    }

}
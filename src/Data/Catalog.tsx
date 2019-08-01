export interface IDictionary<T> {
    [index: string]: T;
}

export interface ICatalogItem {
    id: number;
    sku: string;
    name: string;
    options: ICatalogOption[];
}

export interface ICatalogOption {
    id: number;
    qty: number;
    cost: number;
}

export interface IOrderOptions {
    qty: number;
    cost: number;
    options: ICatalogOption[];
}

export interface IOrder {
    item: ICatalogItem;
    order: IOrderOptions;
}

export interface IApiResponse<T> {
    status: number;
    message?: string;
    data?: IDictionary<any>;
    list?: T[];
}

export interface IApiCatalogResponse extends IApiResponse<ICatalogItem> {}

export interface IApiOrderResponse extends IApiResponse<ICatalogItem> {
    data?: IOrder;
}
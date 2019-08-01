export interface IService {}

export interface IServiceContainer {
    name: string,
    instance: IService;
}

export default class Provider {

    protected static services: IServiceContainer[] = [];

    static registerService(name: string, instance: IService): void {
        if (!!this.services.find((s: IServiceContainer) => s.name === name)) {
            this.services.push({
                name: name,
                instance: instance
            } as IServiceContainer);
        }
    }

    static getService(name: string): IService | null {
        let service: IServiceContainer | undefined = this.services.find((s: IServiceContainer) => s.name === name);
        return service === undefined ? null : (service as IServiceContainer).instance;
    }

}
export interface IMessageBus {
    hasSubscriber(topic: string, callback: ISubscriptionCallback): boolean;
    subscribe(topic: string, callback: ISubscriptionCallback): ISubscription;
    publish(topic: string, data?: any): void;
}

export interface ISubscription {
    unsubscribe(): void;
}

export interface ISubscriptionStructure {
    id: number;
    topic: string;
    callback: ISubscriptionCallback;
}

export interface ISubscriptionCallback {
    (data: any, envelope?: any): void;
}

export default class MessageBusService implements IMessageBus {

    private counter: number = 0;
    private subscriptions: ISubscriptionStructure[] = [];

    public hasSubscriber(topic: string, callback: ISubscriptionCallback): boolean {
        let exists = false;
        this.subscriptions.forEach((subscription: ISubscriptionStructure) => {
            if (subscription.topic === topic && subscription.callback === callback) {
                exists = true;
            }
        });

        return exists;
    }

    public removeSubscription(id: number): void {
        for (let i = 0; i < this.subscriptions.length; i++) {
            if (this.subscriptions[i].id === id) {
                this.subscriptions.splice(i, 1);
                return;
            }
        }
    }

    public publish(topic: string, data?: any): void {
        this.subscriptions.forEach((subscription: ISubscriptionStructure) => {
            if (subscription.topic === topic) {
                subscription.callback.call(this, data);
            }
        });
    }

    public subscribe(topic: string, callback: ISubscriptionCallback): ISubscription {
        if (this.hasSubscriber(topic, callback)) {
            console.warn('WARN: Duplicate subscription to :' + topic);
        }

        this.subscriptions.push({
            id: ++this.counter,
            topic: topic,
            callback: callback
        } as ISubscriptionStructure);

        return new Subscription(this.counter, this.removeSubscription, this);
    }

}

export class Subscription implements ISubscription {

    constructor(private id: number,
                private unsubscribeCallback: ISubscriptionCallback,
                private contextObj: any) {

    }

    public unsubscribe(): void {
        this.unsubscribeCallback.call(this.contextObj, this.id);
    }

}
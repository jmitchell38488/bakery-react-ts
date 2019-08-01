import React from 'react';
import {ICatalogItem, IOrder} from "../../Data/Catalog";
import Model, {ICatalogModel} from "../../Data/Model";
import OrderItem from "./OrderItem";
import './order.css';
import {Link} from "react-router-dom";

const logo = require('../Index/logo.svg') as string;

type OrderProps = {
    history: any;
    match: any;
};

type OrderState = {
    loaded: boolean;
    sku: string;
    item?: ICatalogItem;
    order?: IOrder | undefined;
};

class Order extends React.Component<OrderProps, OrderState> {

    protected model: ICatalogModel;
    protected qty: number;

    constructor(props: OrderProps) {
        super(props);
        this.qty = 0;
        this.model = new Model();
        this.state = {
            loaded: false,
            sku: this.props.match.params.id
        }
    }

    componentDidMount(): void {
        setTimeout(async () => {
            let item = await this.model.getCatalogItem(this.state.sku);
            this.setState({loaded: true, item: item});
        }, 250);
    }

    handleClick = async (): Promise<void> => {
        if (!(!!this.qty)) {
            this.setState({order: undefined});
            console.warn('Cannot calculate because qty field is blank or empty');
            return;
        }

        let order = await this.model.getBakeryOrder(this.state.sku, this.qty);
        this.setState({order: order});
        console.log(this.state);
    };

    handleChange = (event: any): void => {
        this.qty = !!event.target.value ? parseInt(event.target.value) : 0;
    };

    handleResetClick = (): void => {
        this.setState({
            order: undefined
        });
    };

    render() {
        const back = <p className="left back"><Link to="/" >&lt; back</Link></p>;
        if (!this.state.loaded) {
            return (
                <div>
                    {back}
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>Fetching offer from server...</p>
                </div>
            );
        }

        let details, clear, items;
        if (!!this.state.order) {
            clear = <button onClick={this.handleResetClick}>Reset</button>;
            const order = this.state.order.order;

            items = order.options.map(o => {
                let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '';
                return <dl key={id} className="order-item-option"><dt>Qty:</dt><dd>{o.qty}</dd><dt>Cost</dt><dd>${o.cost}</dd></dl>;
            });

            details = (
                <div>
                    <h4 className="left">Order details</h4>
                    <dl><dt>Qty:</dt><dd>{order.qty}</dd></dl>
                    <dl><dt>Cost:</dt><dd>${order.cost}</dd></dl>
                    <h4 className="left">Items</h4>
                    {items}
                </div>
            );
        }

        return (
            <div className="orderContainer">
                {back}
                <OrderItem item={this.state.item as ICatalogItem}/>
                <h4>Create an order for this item</h4>
                <fieldset>
                    <input type="text" id="order_qty" placeholder="qty" onChange={this.handleChange} maxLength={2} minLength={1} />
                    <button onClick={this.handleClick}>Submit</button> {clear}
                </fieldset>
                {details}
            </div>
        )
    }

}

export default Order;
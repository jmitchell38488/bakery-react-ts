import React from 'react';
import {ICatalogItem, IOrder} from "../../Data/Catalog";
import '../Product/product.css';
import './orderitem.css';
import classNames from 'classnames';

type ItemState = {
    order?: IOrder;
}

type ItemProps = {
    item: ICatalogItem;
}

class OrderItem extends React.Component<ItemProps, ItemState> {

    constructor(props: ItemProps) {
        super(props);

        this.state = {} as ItemState;
    }

    render() {
        let item = this.props.item;
        let options = item.options.map(i => (
            <tr key={i.id} className={classNames({
                product: true,
                "order-item": true
            })}>
                <td>{i.id}</td>
                <td>{i.qty}</td>
                <td>$ {i.cost.toFixed(2)}</td>
            </tr>
        ));

        return (
            <div className="products-wrapper offer-item-wrapper">
                <h4>Offer product information</h4>
                <table cellPadding="0" cellSpacing="0">
                    <colgroup>
                        <col width="20%" />
                        <col width="55%" />
                        <col width="25%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <td># Id</td>
                            <td>Name</td>
                            <td>Sku</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="product order-item">
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.sku}</td>
                        </tr>
                    </tbody>
                </table>

                <h4>Options</h4>
                <table cellPadding="0" cellSpacing="0">
                    <colgroup>
                        <col width="10%" />
                        <col width="45%" />
                        <col width="45%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <td># Id</td>
                            <td>Qty</td>
                            <td>Cost</td>
                        </tr>
                    </thead>
                    <tbody>
                        {options}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default OrderItem;

import React from 'react';
import {ICatalogItem, IDictionary} from "../../Data/Catalog";
import './products.css';
import Product from "./Product";

type State = {}

interface Props extends IDictionary<any> {
    items: ICatalogItem[];
}

class Products extends React.Component<Props, State> {

    handleClick = (item: ICatalogItem) => {
        (this.props as any).history.push('/order/' + item.sku);
    };

    render() {
        let counter = 0;
        const items = (this.props.items as ICatalogItem[]).map((i: ICatalogItem) => {
            counter++;
            let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '';
            return <Product pkey={id} key={id} item={i} odd={counter % 2 === 0} handleClick={this.handleClick} />
        });

        return (
            <div className="products-wrapper">
                <h4>Bakery Products</h4>
                <table cellPadding="0" cellSpacing="0">
                    <colgroup>
                        <col width="10%" />
                        <col width="60%" />
                        <col width="20%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <td># Id</td>
                            <td>Name</td>
                            <td>Sku</td>
                            <td>Options</td>
                        </tr>
                    </thead>
                    <tbody>
                    {items}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Products;
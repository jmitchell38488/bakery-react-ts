import React from 'react';
import {ICatalogItem} from "../../Data/Catalog";
import classNames from 'classnames';
import './product.css';

type ProductState = {}

type ProductProps = {
    pkey: string;
    item: ICatalogItem;
    odd: boolean;
    handleClick: any
}

class Product extends React.Component<ProductProps, ProductState> {

    render() {
        let item = this.props.item;
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            this.props.handleClick(this.props.item);
        };

        return (
            <tr id={this.props.pkey} className={classNames({
                product: true,
                odd: this.props.odd
            })} onClick={handleClick}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.options.length}</td>
            </tr>
        );
    }

}

export default Product;

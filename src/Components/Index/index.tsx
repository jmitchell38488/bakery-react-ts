import React from 'react';
import './index.css';
import {ICatalogItem, IDictionary} from "../../Data/Catalog";
import Model, {ICatalogModel} from "../../Data/Model";
import Products from "../Product/Products";

const logo = require('./logo.svg') as string;

type AppProps = {}

interface AppState extends IDictionary<any> {
    loaded: boolean;
    items?: ICatalogItem[];
}

class Index extends React.Component<AppProps, AppState> {

    protected model: ICatalogModel;

    constructor(props: AppProps) {
        super(props);

        this.model = new Model();
        this.state = {
            items: [],
            loaded: false
        };
    }

    componentDidMount(): void {
        // Simulate an API loading time
        setTimeout(async () => {
            let items = await this.model.getCatalogItems();
            this.setState({loaded: true, items: items});
        }, 1200);
    }

    render() {
        let headerHtml: any;

        if (this.state.loaded) {
            headerHtml = <Products items={(this.state.items as ICatalogItem[])} history={(this.props as any).history}/>
        } else {
            headerHtml = (
                <div>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>Loading data from server...</p>
                </div>
            );
        }

        return (
            <div className="App">
                <header className="App-header">
                    {headerHtml}
                </header>
            </div>
        );

    }
}

export default Index;
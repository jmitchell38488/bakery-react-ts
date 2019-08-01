import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from "./Components/Index";
import Order from "./Components/Order/Order";

type AppProps = {};

export const App: React.FunctionComponent<AppProps> = () => (
    <Router>
        <div>
            <div className="App">
                <header className="App-header">
                    <Route path="/" exact render={props => <Index {...props} />} />
                    <Route path="/order/:id" render={props => <Order {...props} />}/>
                </header>
            </div>
        </div>
    </Router>
);
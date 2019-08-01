import React from 'react';
import './App.css';
const logo = require('./logo.svg') as string;

const App: React.FunctionComponent<void> = () => (
    <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
            <p>Loading data from server...</p>
        </header>
    </div>
);

export default App;

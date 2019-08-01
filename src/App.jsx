"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./App.css");
var logo = require('./logo.svg');
var App = function () { return (<div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
            <p>Loading data from server...</p>
        </header>
    </div>); };
exports.default = App;

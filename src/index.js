import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import Provider from './Data/Provider';
import MessageBusService from './Data/Messages';

let messageService = new MessageBusService();
Provider.registerService('messageBus', messageService);

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};

messageService.subscribe('render', () => render());
messageService.publish('render');
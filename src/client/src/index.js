import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';

import history from './history';

import App from './App';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

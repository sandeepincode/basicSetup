import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux';
import history from './history';

// Containers
import HomePage from './containers/HomePage/HomePage';
import InfoPage from './containers/InfoPage/InfoPage';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import Error404Page from './containers/Error404Page/Error404Page';

// Components
import BasePage from './components/BasePage/BasePage';

// Redux
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} basename="/">
      <Switch>

        <Route exact path="/" component={InfoPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />

        <BasePage>
          <Route exact path="/shift" component={HomePage} />
        </BasePage>

        <Route path="*" component={Error404Page} />
      </Switch>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import history from '../history';

import loginReducer from './reducers/login';
import registerReducer from './reducers/register';

const reducers = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

let devTools = f => f;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk, routerMiddleware(history)), devTools),
);

export default store;

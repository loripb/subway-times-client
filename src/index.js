import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

import { createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'

import userReducer from './Redux/userReducer'
import lineReducer from './Redux/lineReducer'
import directionReducer from './Redux/directionReducer'

let rootReducer = combineReducers({
  user: userReducer,
  lines: lineReducer,
  direction: directionReducer
})

function setStore(){
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(rootReducer, composeEnhancers())
}

let storeObject = setStore()


ReactDOM.render(
  <Provider store={ storeObject }>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

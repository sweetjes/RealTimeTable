import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import state from './store';
import App from './App';

/* eslint-disable */
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDom.render(
  <Provider store={state}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);

/* eslint-enable */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'babel-polyfill';

import configureStore from './store';
import App from './containers/App';
import Visualization from './containers/Visualization';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App>
      <Visualization />
    </App>
  </Provider>,
  document.getElementById('root')
);

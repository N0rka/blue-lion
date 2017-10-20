import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

import AppContainer from './components/App.jsx';

const store = configureStore();
render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
    document.getElementById('root'),
);

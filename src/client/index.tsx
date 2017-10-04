import { render, h } from 'preact';
import { Provider } from 'preact-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers/index'

import App from './components/app';

// ADD IN REDUX DEBUGGER
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(thunk))
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

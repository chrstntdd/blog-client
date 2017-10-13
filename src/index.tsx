import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient } from 'react-apollo';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import fooReducer from './redux/reducers/foo-reducer';
import barReducer from './redux/reducers/bar-reducer';

import './index.scss';

import Layout from './routes/Layout';

// ADD IN REDUX DEBUGGER
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const client = new ApolloClient();

const rootReducer = combineReducers({
  foo: fooReducer,
  bar: barReducer,
  apollo: client.reducer()
});

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <ApolloProvider client={client} store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);

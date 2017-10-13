import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './index';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Layout = () => (
  <div id="app">
    <Navigation />
    <div className="container">
      <Switch>
        {routes.map(route => <Route key={route.name} {...route} />)}
      </Switch>
    </div>
    <Footer />
  </div>
);

export default Layout;

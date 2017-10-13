import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './index';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Layout = () => (
  <main>
    <Navigation />
    <Switch>
      {routes.map(route => <Route key={route.name} {...route} />)}
    </Switch>
    <Footer />
  </main>
);

export default Layout;

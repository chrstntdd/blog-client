import { Router } from 'preact-router';
import { h } from 'preact';
import styles from './app.scss';

/* Static components */
import Header from './Header';
import Footer from './Footer';

/* Page Components */
import Navigation from './Navigation';
import Home from './Home';
import About from './About';
import Portfolio from './Portfolio';
import Contact from './Contact';

const App = () => (
  <div id="app">
    <Navigation />
    <Router>
      <Home path="/" />
      <About path="/about" />
      <Portfolio path="/portfolio" />
      <Contact path="/contact" />
    </Router>
    <Footer />
  </div>
);

export default App;

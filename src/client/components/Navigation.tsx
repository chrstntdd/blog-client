import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './navigation.scss';

const Navigation = () => (
  <nav className={styles.mainNav} role="navigation">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      <li>
        <Link to="/portfolio">Portfolio</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;

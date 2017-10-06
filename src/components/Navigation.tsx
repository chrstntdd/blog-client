import { h } from 'preact';
import { Link } from 'preact-router';

import styles from './navigation.scss';

const Navigation = props => (
  <nav class={styles.mainNav} role="navigation">
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/portfolio">Portfolio</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;

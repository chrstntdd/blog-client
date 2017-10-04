import { h } from 'preact';
import { Link } from 'preact-router';

const Navigation = props => (
  <nav role="navigation">
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
    <Link href="/portfolio">Portfolio</Link>
    <Link href="/contact">Contact</Link>
  </nav>
);

export default Navigation;

import { h, Component } from 'preact';
import styles from './header.scss';

import Navigation from './Navigation';

interface PropTypes {}
interface StateType {}

export default class Header extends Component<PropTypes, StateType> {
  render() {
    return (
      <header class={styles.header}>
        <h1>Christian Todd</h1>
        <p>Web Developer</p>
        <Navigation />
      </header>
    );
  }
}

import { h, Component } from 'preact';
import styles from './header.scss';

interface PropTypes {}
interface StateType {}

export default class Header extends Component<PropTypes, StateType> {
  render() {
    return (
      <header class={styles.header} role="banner">
        <div class={styles.heroImg} />
        <div class={styles.heroText}>
          <h1>Christian Todd</h1>
          <h3>Web Developer</h3>
        </div>
      </header>
    );
  }
}

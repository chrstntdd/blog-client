import * as React from 'react';
import styles from './header.scss';

interface PropTypes {}
interface StateType {}

export default class Header extends React.Component<PropTypes, StateType> {
  render() {
    return (
      <header className={styles.header} role="banner">
        <div className={styles.heroImg} />
        <div className={styles.heroText}>
          <h1>Christian Todd</h1>
          <h3>Web Developer</h3>
        </div>
      </header>
    );
  }
}

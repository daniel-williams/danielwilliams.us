import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { NavMode } from './nav.types';
import * as styles from './nav.component.scss';


interface NavProps {}
interface NavState {
  navMode: NavMode,
  test: string,
}

export class Nav extends React.Component<NavProps, NavState> {
  constructor(props) {
    super(props);

    this.state = {
      navMode: NavMode.Full,
      test: 'test value',
    };
  }
  render() {
    const { navMode, test } = this.state;

    return (
      <div className={styles.links}>
        <Link className={styles.link} to='/'>Home</Link>
        <Link className={styles.link} to='/projects'>Projects</Link>
        <Link className={styles.link} to='/albums'>Seattle life</Link>
        <Link className={styles.link} to='/about'>About me</Link>
      </div>
    );
  }
}
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';

import { NavMode } from './nav.types';
import * as styles from './nav.component.scss';

interface NavLink {
  path: string;
  title: string;
}
interface NavProps {}
interface NavState {
  navMode: NavMode,
  test: string,
  items: NavLink[],
}

const navLinks = [
  { path: '/', title: 'Home' },
  { path: '/projects', title: 'Projects' },
  { path: '/albums', title: 'Seattle life' },
  { path: '/about', title: 'About me' },
];

export class Nav extends React.Component<NavProps, NavState> {
  constructor(props) {
    super(props);

    this.state = {
      navMode: NavMode.Full,
      test: 'test value',
      items: [],
    };
  }

  componentWillMount() {
    navLinks.forEach((x, i) => {
      setTimeout(() => this.setState({
        items: [...this.state.items, x]
      }), 100 * i);
    });
  }

  render() {
    const { navMode, test, items } = this.state;
    const navLinks = items.map(x => {
      return (
        <div key={x.path}>
          <Link className='styles.link' to={x.path}>{x.title}</Link>
        </div>
      );
    });

    return (
      <div className={styles.links}>
        {/* <button onClick={() => this.doTrans()}>build</button> */}
        <ReactCSSTransitionGroup
          transitionName='example'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {navLinks}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  doTrans() {
    this.setState({
      items: [],
    });
    setTimeout(() => {
      navLinks.forEach((x, i) => {
        setTimeout(() => this.setState({
          items: [...this.state.items, x]
        }), 100 * i);
      });
    }, 300);

  }
}
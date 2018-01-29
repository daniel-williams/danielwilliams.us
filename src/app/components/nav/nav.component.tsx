import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as TransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames';

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
    this.reset();
  }

  render() {
    const { navMode, test, items } = this.state;
    const navLinks = items.map((x, i) => {
      return (
        <Link key={i} className={styles.link} to={x.path}>{x.title}</Link>
      );
    });

    return (
      <div className={styles.links}>
        <button onClick={() => this.reset()}>reset</button>
        <button onClick={() => this.addItem()}>add</button>
        <button onClick={() => this.removeItem()}>remove</button>
        <TransitionGroup
          component='div'
          className={styles.linkWrap}
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave,
            leaveActive: styles.leaveActive,
          }}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {navLinks}
        </TransitionGroup>
      </div>
    );
  }

  reset() {
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

  addItem() {
    const { items } = this.state;

    this.setState({
      items: items.slice().concat([{path: '/', title: 'new item'}])
    });
  }

  removeItem() {
    const { items } = this.state;

    if(items.length) {
      this.setState({
        items: items.slice(0, items.length - 1)
      });
    }
  }
}

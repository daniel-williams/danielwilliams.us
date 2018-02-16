import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames';

import { NavMode } from './nav.types';
import * as styles from './nav.component.scss';
import { linkData, LinkItem } from './NavData';


interface NavProps {}
interface NavState {
  navMode: NavMode,
  test: string,
  items: LinkItem[],
}

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
      return i === 0
        ? this.renderButtonLink(i.toString(), x.path, x.text)
        : this.renderTextLink(i.toString(), x.path, x.text)
    });

    return (
      <div className={styles.links}>
        <CSSTransitionGroup
          component='div'
          className={styles.linkWrap}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave,
            leaveActive: styles.leaveActive,
          }}>
          {navLinks}
        </CSSTransitionGroup>
      </div>
    );
  }

  renderButtonLink(key: string, path: string, text: string) {
    const src = `/assets/images/${text.toLowerCase()}.jpg`;
    return (
      <Link key={key} className={styles.buttonLink} to={path}>
        <div className={styles.button}>
          <img src={src} />
        </div>
      </Link>
    );
  }

  renderTextLink(key: string, path: string, text: string) {
    return (
      <Link key={key} className={styles.textLink} to={path}>{text}</Link>
    );
  }

  reset() {
    this.setState({
      items: [],
    });
    setTimeout(() => {
      linkData.forEach((x, i) => {
        setTimeout(() => this.setState({
          items: [...this.state.items, x]
        }), 100 * i);
      });
    }, 300);
  }
}

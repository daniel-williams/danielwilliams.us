import * as React from 'react';
import * as classNames from 'classnames';

import { Breakpoint, BreakpointService, compactModes } from '../shared';
import { NavItem } from './nav-item.component';
import { linkData, NavMode } from './nav.types';
import * as styles from './nav.component.scss';


interface NavProps {}
interface NavState {
  hover: boolean,
}

export class Nav extends React.Component<NavProps, NavState> {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  render() {
    const items = linkData.map(x => <NavItem key={x.path} data={x}></NavItem>);

    return (
      <BreakpointService>{breakpoint =>
        <div
          className={this.getNames(breakpoint)}
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleLeave}
          onClick={this.handleClick}>
          <div
            className={styles.logo}
            style={{backgroundImage: 'url(/assets/images/home.jpg)'}}></div>
          {items}
        </div>
      }</BreakpointService>
    );
  }

  getNames = (breakpoint: Breakpoint) => {
    const { hover } = this.state;

    return classNames(styles.outerWrap, {
      [styles.compact]: !hover && compactModes.includes(breakpoint)
    });
  }

  handleEnter = (e) => {
    this.setState({
      hover: true,
    });
  }

  handleLeave = (e) => {
    this.setState({
      hover: false,
    });
  }

  handleClick = (e) => {
    this.setState({
      hover: false,
    });
  }
}

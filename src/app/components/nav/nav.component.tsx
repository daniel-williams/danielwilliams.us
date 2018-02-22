import * as React from 'react';
import { withRouter } from 'react-router-dom';
import * as classNames from 'classnames';

import { Breakpoint, BreakpointService, compactModes } from '../shared';
import { NavItem } from './nav-item.component';
import { linkData, NavMode } from './nav.types';
import * as styles from './nav.component.scss';


interface NavProps {
  history: any,
}
interface NavState {
  clicked: boolean,
  hover: boolean,
}

const Nav = withRouter(class extends React.Component<NavProps, NavState> {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      hover: false,
    };
  }

  render() {
    const items = linkData.map(x => <NavItem key={x.path} data={x}></NavItem>);

    return (
      <BreakpointService>{breakpoint =>
        <div
          className={this.getNames(breakpoint)}
          onMouseLeave={this.handleLeave}
          onClick={this.handleClick}>
          <div
            className={styles.logo}
            onClick={this.handleHomeClick}></div>
          <div
            className={styles.itemWrap}
            onMouseEnter={this.handleEnter}>
            {items}
          </div>
        </div>
      }</BreakpointService>
    );
  }

  getNames = (breakpoint: Breakpoint) => {
    const { clicked, hover } = this.state;

    return classNames(styles.outerWrap, {
      [styles.clicked]: clicked,
      [styles.compact]: !hover && compactModes.includes(breakpoint),
    });
  }

  handleHomeClick = (e) => {
    this.props.history.push('/')
  }

  handleEnter = (e) => {
    this.setState({
      hover: true,
      clicked: false,
    });
  }

  handleLeave = (e) => {
    this.setState({
      hover: false,
      clicked: false,
    });
  }

  handleClick = (e) => {
    this.setState({
      hover: false,
      clicked: true,
    });
  }
});

export {
  Nav
};

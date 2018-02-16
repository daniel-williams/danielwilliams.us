import * as React from 'react';
import * as classNames from 'classnames';

import { NavItem } from './nav-item.component';
import { linkData, NavMode } from './nav.types';
import * as styles from './nav.component.scss';


interface NavProps {}
interface NavState {
  navMode: NavMode,
}

export class Nav extends React.Component<NavProps, NavState> {
  constructor(props) {
    super(props);

    this.state = {
      navMode: NavMode.Full,
    };
  }

  render() {
    const { navMode } = this.state;
    const items = linkData.map(x => <NavItem key={x.path} data={x}></NavItem>);
    const names = classNames(styles.navWrap, {
      [styles.compact]: navMode === NavMode.Compact,
    });

    return (
      <div className={names}>
        {items}
        <button onClick={this.toggleMode}>toggle</button>
      </div>
    );
  }

  toggleMode = (evt) => {
    const mode = this.state.navMode === NavMode.Full
      ? NavMode.Compact
      : NavMode.Full;

    this.setState({
      navMode: mode,
    });
  }
}

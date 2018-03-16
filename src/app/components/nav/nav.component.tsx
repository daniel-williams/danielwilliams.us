import * as React from 'react';
import { withRouter } from 'react-router-dom';
import * as classNames from 'classnames';

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

export const Nav = withRouter(class extends React.Component<NavProps, NavState> {
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
      <div className={styles.outerWrap}>
        <div
          className={styles.logo}
          onClick={this.handleHomeClick}></div>
        <div className={styles.itemWrap}>
          {items}
        </div>
      </div>
    );
  }

  handleHomeClick = (e) => {
    this.props.history.push('/')
  }
});

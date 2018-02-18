import * as React from 'react';
import * as classNames from 'classnames';

import { Breakpoint, BreakpointService } from '../shared';
import { NavItem } from './nav-item.component';
import { linkData, NavMode } from './nav.types';
import * as styles from './nav.component.scss';


interface NavProps {}
interface NavState {}

export class Nav extends React.Component<NavProps, NavState> {
  constructor(props) {
    super(props);
  }

  render() {
    const items = linkData.map(x => <NavItem key={x.path} data={x}></NavItem>);

    return (
      <BreakpointService>
        {(breakpoint) =>
          <div className={this.getNames(breakpoint)}>
            {items}
          </div>
        }
      </BreakpointService>
    );
  }

  getNames(breakpoint: Breakpoint): any {
    return classNames(styles.navWrap, {
      [styles.compact]: breakpoint === Breakpoint.XS || breakpoint === Breakpoint.SM || breakpoint === Breakpoint.MD,
    });
  }
}

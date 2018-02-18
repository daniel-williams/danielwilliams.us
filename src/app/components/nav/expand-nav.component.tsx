import * as React from 'react';
import { Link } from 'react-router-dom';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { LinkItem, NavMode } from './nav.types';
import * as styles from './expand-nav.component.scss';


interface ExpandNavProps {
  data: LinkItem[],
  mode: NavMode,
}
interface ExpandNavState {}

export class ExpandNav extends React.Component<ExpandNavProps, ExpandNavState> {
  render() {
    const { data } = this.props;
    const items = data.map(x => {
      return (
        <Link
          key={x.path}
          className={styles.item}
          to={x.path}>{x.text}</Link>
      );
    });

    return (
      <CSSTransitionGroup
        component='div'
        className={styles.nav}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive,
        }}>
        {items}
      </CSSTransitionGroup>
    );
  }
}



// return (
//   <div className={styles.links}>
//     <CSSTransitionGroup
//       component='div'
//       className={styles.linkWrap}
//       transitionEnterTimeout={500}
//       transitionLeaveTimeout={500}
//       transitionName={{
//         enter: styles.enter,
//         enterActive: styles.enterActive,
//         leave: styles.leave,
//         leaveActive: styles.leaveActive,
//       }}>
//       {navLinks}
//     </CSSTransitionGroup>
//   </div>
// );
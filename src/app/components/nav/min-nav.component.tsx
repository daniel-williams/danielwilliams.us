import * as React from 'react';
import { Link } from 'react-router-dom';

import { LinkItem } from './nav.types';
import * as styles from './min-nav.component.scss';


interface MinNavProps {
  data: LinkItem[],
}
interface MinNavState {}

export class MinNav extends React.Component<MinNavProps, MinNavState> {
  render() {
    const { data } = this.props;
    const items = data.map(x => {
      return (
        <Link
          key={x.path}
          className={styles.item}
          to={x.path}><i className={x.icon}></i></Link>
      );
    });

    return (
      <div className={styles.nav}>
        {items}
      </div>
    );
  }
}
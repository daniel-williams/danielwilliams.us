import * as React from 'react';
import { Link } from 'react-router-dom';

import { LinkItem } from './nav.types';
import * as styles from './nav-item.component.scss';


interface NavItemProps {
  data: LinkItem
}
interface NavItemState {}

export class NavItem extends React.Component<NavItemProps, NavItemState> {
  render() {
    const { icon, path, text } = this.props.data;
    const iconEl = <div className={styles.icon}><i className={icon}></i></div>;
    const textEl = <div className={styles.text}>{text}</div>;

    return (
      <Link className={styles.link} to={path}>{iconEl}{textEl}</Link>
    );
  }
}

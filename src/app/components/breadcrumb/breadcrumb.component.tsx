import * as React from 'react';
import { Link } from 'react-router-dom';
import * as gsap from 'gsap';

import * as styles from './breadcrumb.component.scss';


interface BreadcrumbProps {
  path?: string,
  text?: string,
  isLink?: boolean,
  divider?: any,
  showDivider?: boolean,
}
interface BreadcrumbState {}


export class Breadcrumb extends React.Component<BreadcrumbProps, BreadcrumbState> {
  hostEl;

  static defaultProps = {
    text: 'link text',
    isLink: true,
    divider: <div className={styles.divider}>&gt;</div>,
    showDivider: true,
  };

  componentWillAppear(cb) {
    gsap.TweenLite.to(this.hostEl, .5, {
      opacity: 1,
      transform: 'translateX(0)',
      onComplete: cb,
    });
  }

  componentWillEnter(cb) {
    gsap.TweenLite.to(this.hostEl, .5, {
      opacity: 1,
      transform: 'translateX(0)',
      onComplete: cb,
    });
  }

  componentWillLeave(cb) {
    gsap.TweenLite.to(this.hostEl, 0, {
      opacity: 0,
      onComplete: cb,
    });
  }

  render() {
    const { isLink, path, text, divider, showDivider } = this.props;
    const crumb = <div className={styles.text}>{text}</div>;
    const content = isLink
      ? <Link to={path}>{crumb}</Link>
      : crumb;

    return (
      <div
        className={styles.crumbWrap}
        ref={(el) => { this.hostEl = el; }}>
        <div className={styles.crumb}>
          {showDivider ? divider : null}
          { content }
        </div>
      </div>
    );
  }
}
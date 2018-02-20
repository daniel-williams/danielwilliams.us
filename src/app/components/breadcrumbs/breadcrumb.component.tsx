import * as React from 'react';
import { Link } from 'react-router-dom';
import * as gsap from 'gsap';

import * as styles from './breadcrumb.component.scss';


var Easing = require('EasePack');

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
    this.fadeIn(cb);
  }

  componentWillEnter(cb) {
    this.fadeIn(cb);
  }

  componentWillLeave(cb) {
    this.fadeOut(cb);
  }

  fadeIn(cb) {
    gsap.TweenLite.fromTo(this.hostEl, 0.3, {
      opacity: 0,
      scale: 1.5,
    }, {
      opacity: 1,
      scale: 1.0,
      ease: Easing.easeOut,
      onComplete: cb,
    });
  }

  fadeOut(cb) {
    gsap.TweenLite.to(this.hostEl, 0, {
      opacity: 0,
      onComplete: cb,
    });
  }

  render() {
    const { isLink, path, text, divider, showDivider } = this.props;
    const crumb = <div ref={(el) => { this.hostEl = el; }} className={styles.text}>{text}</div>;
    const content = isLink
      ? <Link to={path}>{crumb}</Link>
      : crumb;

    return (
      <div
        className={styles.crumbWrap}
        >
        <div className={styles.crumb}>
          {showDivider ? divider : null}
          { content }
        </div>
      </div>
    );
  }
}
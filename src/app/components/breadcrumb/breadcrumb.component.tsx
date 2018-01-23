import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames';
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
  linkItem;

  static defaultProps = {
    text: 'link text',
    isLink: false,
    divider: <div className={styles.divider}>&gt;</div>,
    showDivider: true,
  };

  componentDidMount() {
    var tween = gsap.TweenLite.to(this.linkItem, .5, {
      opacity: 1,
      transform: 'translateX(0)',
    });
  }

  componentWillUnmount() {
    var tween = gsap.TweenLite.to(this.linkItem, .2, {
      opacity: 0
    });
  }

  render() {
    const { isLink, path, text, divider, showDivider } = this.props;
    const cnames = classNames(styles.crumbWrap);
    const crumb = <div className={styles.text}>{text}</div>;
    const content = isLink
      ? <Link to={path}>{crumb}</Link>
      : crumb;

    return (
      <div
        className={cnames}
        ref={(el) => { this.linkItem = el; }}>
        <div className={styles.crumb}>
          {showDivider ? divider : null}
          { content }
        </div>
      </div>
    );
  }
}
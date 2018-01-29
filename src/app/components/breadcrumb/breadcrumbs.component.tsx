import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import * as classNames from 'classnames';

import { EmptyState } from '../../models';
import { Breadcrumb } from './breadcrumb.component';
import * as styles from './breadcrumbs.component.scss';


interface BreadcrumbsProps {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

class BreadcrumbsComponent extends React.Component<BreadcrumbsProps, EmptyState> {

  componentDidMount() {
    const crumbs = document.querySelectorAll('.crumb-list .item');
  }

  render() {
    const { match, location, history } = this.props;
    const crumbs = this.buildCrumbs(location.pathname);

    return (
      <div className={styles.breadcrumbsWrap}>
        {crumbs}
      </div>
    )
  }

  private buildCrumbs(pathname: string): any[] {
    let count = 0;
    let homeCrumb = { id: count++, text: 'home', path: '/' };
    let prefix = '';
    let { items } = pathname.split('/').filter(x => x.length).reduce((accum, x) => {
      const path = accum.prefix + '/' + x;

      accum.items.push({ id: count++, text: x, path: path });
      accum.prefix = path;

      return accum;
    }, {items: [homeCrumb], prefix});

    return items.map((x, i) => {
      const {id, text, path} = x;
      const isLink = x.path !== pathname;
      const showDivider = i > 0;
      const style = {
        zIndex: 10 - i,
      };

      return (
        <div key={text} className={styles.breadcrumbWrap} style={style}>
          <Breadcrumb
            text={text}
            path={path}
            isLink={isLink}
            showDivider={showDivider} />
        </div>
      );
    });
  }
}

export const Breadcrumbs = withRouter(BreadcrumbsComponent);

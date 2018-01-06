import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { EmptyState } from '../../models';
import * as styles from './breadcrumbs.component.scss';


interface BreadcrumbsProps {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

class BreadcrumbsComponent extends React.Component<BreadcrumbsProps, EmptyState> {
  render() {
    const { match, location, history } = this.props;
    const crumbs = this.buildCrumbs(location.pathname);

    return (
      <div className={styles.breadcrumbs}>
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
      const divider = i > 0
        ? <div className={styles.divider}>&gt;</div>
        : null;
      const link = x.path !== pathname
        ? <Link to={x.path} className={styles.item}>{x.text}</Link>
        : <div className={styles.item}>{x.text}</div>;

      return (
        <div key={x.id} className={styles.breadcrumb}>
          {divider}
          {link}
        </div>
      );
    });
  }
}

export const Breadcrumbs = withRouter(BreadcrumbsComponent);

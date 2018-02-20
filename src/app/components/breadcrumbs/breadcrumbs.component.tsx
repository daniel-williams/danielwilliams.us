import * as React from 'react';
import { withRouter } from 'react-router-dom';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';

import { Crumb } from './breadcrumbs.types';
import { Breadcrumb } from './breadcrumb.component';
import * as styles from './breadcrumbs.component.scss';


interface BreadcrumbsProps {
  match: any,
  location: any,
  history: any
}
interface BreadcrumbState {}

const Breadcrumbs = withRouter(class extends React.Component<BreadcrumbsProps, BreadcrumbState> {
  render() {
    const { match, location, history } = this.props;
    const breadcrumbs = this.getCrumbsFromUrl(location.pathname).map((crumb, i) => {
      return (
        <Breadcrumb
          key={crumb.id}
          path={crumb.path}
          text={crumb.title}
          isLink={crumb.path !== location.pathname}
          showDivider={i > 0}/>
      );
    });

    return (
      <TransitionGroup component='div' className={styles.breadcrumbsWrap}>
        {breadcrumbs}
      </TransitionGroup>
    )
  }

  private getCrumbsFromUrl(fullPath: string): Crumb[] {
    return fullPath.split('/').filter(x => x.length).reduce((crumbs, pathSegment) => {
      return crumbs.concat([new Crumb(pathSegment, crumbs[crumbs.length - 1].path + '/' + pathSegment, pathSegment)]);
    }, [new Crumb('0', '', 'home')]);
  }
});

export {
  Breadcrumbs
};

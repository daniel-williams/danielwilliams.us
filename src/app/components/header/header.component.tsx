import * as React from 'react';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';

import { Breadcrumbs } from '../breadcrumb/breadcrumbs.component';
import { EmptyState, EmptyProps } from '../../models';

import * as styles from './header.component.scss';


export class Header extends React.Component<EmptyState, EmptyProps> {
  render() {
    return (
      <div className={styles.header}>
        <Breadcrumbs></Breadcrumbs>
      </div>
    );
  }
}
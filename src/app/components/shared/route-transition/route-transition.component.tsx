import * as React from 'react';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';
import { withRouter } from 'react-router-dom';

import { fadeUp } from './fade-up.component';
import * as styles from './route-transition.component.scss';

const FadeUpTransition = fadeUp(class extends React.Component<any, any> {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.transitionWrap}>{children}</div>
    );
  }
});

export const RouteTransition = withRouter(class extends React.Component<any, any> {
  render() {
    const { children, location } = this.props;

    return (
      <TransitionGroup component='div'>
        <FadeUpTransition key={location.pathname}>
          {children}
        </FadeUpTransition>
      </TransitionGroup>
    );
  }
});


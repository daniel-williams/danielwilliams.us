import * as React from 'react';

import * as styles from './layout-manager.component.scss';


interface LayoutManagerProps {
}

export class LayoutManager extends React.Component<LayoutManagerProps, {}> {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.layoutManagerWrap}>
        {children}
      </div>
    );
  }
}

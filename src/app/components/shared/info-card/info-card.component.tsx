import * as React from 'react';

import * as styles from './info-card.component.scss';


export class InfoCard extends React.Component<{}, {}> {
  static get defaultProps() {
    return {
      onClick: (e) => {},
    }
  }
  render() {
    const { children } = this.props;

    return (
      <div className={styles.cardWrap}>
        {children}
      </div>
    );
  }
}

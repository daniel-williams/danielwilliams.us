import * as React from 'react';
import { spring, StaggeredMotion } from 'react-motion';

import * as styles from './info-card-grid.component.scss';


export class InfoCardGrid extends React.Component<{}, {}> {
  render() {
    const { children } = this.props;
    const items = React.Children.toArray(children);
    const defaultStyles = React.Children.map(children, (c, i) => ({
      y: 100,
      opacity: 0.01,
    }));

    return (
      <StaggeredMotion
        defaultStyles={defaultStyles}
        styles={s => s.map((_, i) => {
          return i === 0
            ? {y: spring(0), opacity: spring(1)}
            : {y: spring(s[i - 1].y), opacity: spring(s[i - 1].opacity)}
        })}>
        {moData =>
          <div className={styles.gridWrap}>
            {moData.map((_, i) =>
              <div key={i} className={styles.gridItemWrap} style={{
                transform: `translatey(${_.y}%)`,
                opacity: _.opacity}}>
                {items[i]}
              </div>
            )}
          </div>
        }
      </StaggeredMotion>
    );
  }
}

import * as React from 'react';

import * as styles from './info-card.component.scss';


interface InfoCardProps {
  onClick?: (e) => void,
  onMouseEnter?: (e) => void,
  onMouseLeave?: (e) => void,
  style?: any,
}

export class InfoCard extends React.Component<InfoCardProps, {}> {
  static get defaultProps() {
    return {
      onClick: (e) => {},
      onMouseEnter: (e) => {},
      onMouseLeave: (e) => {},
    };
  }

  render() {
    const { children, onClick, onMouseEnter, onMouseLeave, style } = this.props;

    return (
      <div
        className={styles.cardWrap}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter.bind(this, onMouseEnter)}
        onMouseLeave={this.handleMouseLeave.bind(this, onMouseLeave)}
        style={style}>
        {children}
      </div>
    );
  }

  handleMouseEnter = (cb, e) => {
    cb(e);
  };

  handleMouseLeave = (cb, e) => {
    cb(e);
  };
}

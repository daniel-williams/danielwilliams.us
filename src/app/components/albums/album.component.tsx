import * as React from 'react';

import * as styles from './album.component.scss';

export class Album extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.albumWrap}>
        <h1>Album Title</h1>
        <p className={styles.description}>album description</p>
      </div>
    );
  }
}

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  AlbumDirectory,
  Album1,
  Album2
} from './';
import * as styles from './albums.component.scss';


export class Albums extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.albumsWrap}>
        <Switch>
          <Route exact path='/albums' component={AlbumDirectory} />
          <Route path='/albums/one' component={Album1} />
          <Route path='/albums/two' component={Album2} />
        </Switch>
      </div>
    );
  }
}

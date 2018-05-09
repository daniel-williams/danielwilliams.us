import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Measure from 'react-measure';

import {
  AlbumDirectory,
  Album1,
  Album2
} from './';
import * as styles from './albums.component.scss';

interface AlbumsProps {}
interface AlbumsState {
  dimensions: {
    width: number,
    height: number,
  },
}

export class Albums extends React.Component<AlbumsProps, AlbumsState> {
  constructor(props: AlbumsProps) {
    super(props);

    this.state = {
      dimensions: {
        width: -1,
        height: -1
      },
    }
  }

  onResize = (contentRect) => {
    this.setState({ dimensions: contentRect.bounds })
  };

  render() {
    return (
      <Measure
        bounds
        onResize={this.onResize}
      >{({ measureRef }) =>
        <div ref={measureRef} className={styles.albumsWrap}>
          <Switch>
            <Route exact path='/albums' render={(props) => <AlbumDirectory {...props} dimensions={this.state.dimensions} />} />
            <Route path='/albums/one' component={Album1} />
            <Route path='/albums/two' component={Album2} />
          </Switch>
        </div>
      }</Measure>
    );
  }
}

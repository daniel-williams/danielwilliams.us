import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { AlbumsStore, stores, StoreState } from '../../stores';
import { InfoCard, InfoCardGrid } from '../shared';
import * as styles from './album-directory.component.scss';


const albumAssets = '/assets/albums';

interface AlbumDirectoryProps {
  albums?: AlbumsStore;
  dimensions: any;
  history: any;
}

@inject(stores.albums)
@observer
class AlbumDirectoryComp extends React.Component<AlbumDirectoryProps & RouteComponentProps<AlbumDirectoryProps>, {}> {
  componentDidMount() {
    const { albums } = this.props;

    if(albums.state === StoreState.stale) {
      albums.fetchAlbums();
    }
  }

  render() {
    const { albums, dimensions } = this.props;
    const itemStyles = {
      minWidth: '300px',
      maxWidth: `${(dimensions.width / 2) - 17}px`,
      height: '100%',
    };
    const items = albums.albums.map(item => (
      <InfoCard
        key={item.id}
        onClick={e => this.toRoute(`/albums/${item.id}`)}
        style={itemStyles}>
        <AlbumCard {...item} />
      </InfoCard>
    ));

    const grid = items.length
      ?
        <InfoCardGrid>
          {items}
        </InfoCardGrid>
      : null;

    return (
      <div>
        <h1>Albums</h1>
        {grid}
      </div>
    );
  }

  toRoute = (path: string) => {
    this.props.history.push(path);
  };
}

export const AlbumDirectory = withRouter(AlbumDirectoryComp);


const AlbumCard = (props) => <>
  <h2>{props.title}</h2>
  <div className={styles.albumSummary}>
    <AlbumPoster {...props} />
    <div className={styles.description}>{props.description}</div>
  </div>
</>;

const AlbumPoster = (props) => {
  const { poster } = props;

  return poster
    ?
      <div className={styles.poster}>
        <img src={`${albumAssets}/${props.poster}`} alt='album poster' />
      </div>
    : null;
}
import { action, computed , observable, reaction } from 'mobx';
import fetch from 'node-fetch';

import { StoreState } from './store-state';

const albumsEndpoint = 'http://localhost:5000/api/albums';
const albumsRoot = '/assets/images/albums/';

class Album {
  id: number;
  title: string;
  description: string;
  poster: string;
  items: string[];

  constructor(id, title = 'Album', description = '', poster = null, items = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.poster = poster || `${albumsRoot}${id}/poster.png`;
    this.items = items;
  }
}

export class AlbumsStore {
  @observable state: StoreState = StoreState.stale;
  @observable albums: Album[] = [];

  @action
  fetchAlbums() {
    this.albums = [];
    this.state = StoreState.pending;
    fetch(`${albumsEndpoint}`)
      .then(res => res.json())
      .then(json => {
        this.add(json.map(item => new Album(item.id, item.title, item.description, item.poster)));
        this.state = StoreState.done;
      })
      .catch(err => {
        console.log('fetch error: ', err);
        this.state = StoreState.error;
      });
  }

  @action
  add(albums: Album[]) {
    this.albums = this.albums.concat(albums);
  }
}

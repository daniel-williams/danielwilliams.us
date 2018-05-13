import { createBrowserHistory } from 'history';

import { AlbumsStore } from './album.store';
import { ModalStore } from './modal.store';
import { RouterStore } from './router.store';


const history = createBrowserHistory();
const albums = new AlbumsStore();
const modal = new ModalStore();
const router = new RouterStore(history);

// MobX rootStore
export const rootStore = {
  albums,
  modal,
  router,
};

export const stores = {
  albums: 'albums',
  modal: 'modal',
  router: 'router',
};

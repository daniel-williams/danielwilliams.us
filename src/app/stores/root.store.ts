import { createBrowserHistory } from 'history';

import { ModalStore } from './modal.store';
import { RouterStore } from './router.store';


const modal = new ModalStore();
const history = createBrowserHistory();
const router = new RouterStore(history);

// MobX rootStore
export const rootStore = {
  modal,
  router,
};

export const stores = {
  modal: 'modal',
  router: 'router',
}

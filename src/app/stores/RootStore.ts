import { createBrowserHistory } from 'history';

import { RouterStore } from './RouterStore';


const history = createBrowserHistory();
const router = new RouterStore(history);

// MobX rootStore
export const rootStore = {
  router,
};

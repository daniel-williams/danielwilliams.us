import { configure } from 'mobx';
import { enableLogging } from 'mobx-logger';

import Constants from './app-constants';


// don't allow state modifications outside actions
configure({
  enforceActions: true,
});

// MobX logging
if(Constants.app.logInfo) {
  enableLogging({
    action: true,
    reaction: true,
    transaction: true,
    compute: true,
  });
}
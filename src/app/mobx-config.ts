import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';

import Constants from './app-constants';


// MobX strict mode
useStrict(true);

// MobX logging
if(Constants.app.logInfo) {
  enableLogging({
    action: true,
    reaction: true,
    transaction: true,
    compute: true,
  });
}
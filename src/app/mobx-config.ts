import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';

import { appConstants } from './app.constants';


// MobX strict mode
useStrict(true);

// MobX logging
if(appConstants.logInfo) {
  enableLogging({
    action: true,
    reaction: true,
    transaction: true,
    compute: true,
  });
}
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';
import { Router } from 'react-router';

import './mobx-config'; // configure strict mode and logger
import { rootStore } from './stores';
import { Root, DevTools } from './components';

import * as styles from './app.style.scss';

const App = () => (
  <>
    <div id={styles.app}>
      <Provider {...rootStore}>
        <DevTools>
          <Router history={rootStore.router.history}>
            <Root />
          </Router>
        </DevTools>
      </Provider>
    </div>
    <div id={styles.modalWrap}></div>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));

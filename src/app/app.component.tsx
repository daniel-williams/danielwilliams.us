import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';
import { Router } from 'react-router';

import './mobx-config'; // configure strict mode and logger
import { rootStore } from './stores';
import { RootLayoutManager } from './components';

import * as styles from './app.style.scss';

const App = () => (
  <>
    <div id={styles.app}>
      <Provider {...rootStore}>
        <Router history={rootStore.router.history}>
          <RootLayoutManager />
        </Router>
      </Provider>
    </div>
    <div id={styles.modalWrap}></div>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));

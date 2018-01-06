import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';
import { Router } from 'react-router';

import './mobx-config'; // configure strict mode and logger
import { rootStore } from './stores';
import { Root, DevTools } from './components';

import './app.style.scss';


const App = () => (
  <Provider {...rootStore}>
    <DevTools>
      <Router history={rootStore.router.history}>
        <Root />
      </Router>
    </DevTools>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));

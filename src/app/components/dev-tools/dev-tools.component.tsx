import * as React from 'react';

import { appConstants } from '../../app.constants';


export class DevTools extends React.Component<{}, {}> {
  renderDevTool() {
    if (appConstants.isDev) {
      const MobxReactDevTools = require('mobx-react-devtools').default;

      return (<MobxReactDevTools />);
    }
  };

  render() {
    return (
      <div>
        {this.props.children}
        {this.renderDevTool()}
      </div>
    );
  }
};

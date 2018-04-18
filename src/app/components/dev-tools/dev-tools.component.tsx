import * as React from 'react';

import Constants from '../../app-constants';


export class DevTools extends React.Component<{}, {}> {
  renderDevTool() {
    if (Constants.app.isDev) {
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
}

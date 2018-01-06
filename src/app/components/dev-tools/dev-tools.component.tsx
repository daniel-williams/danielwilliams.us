import * as React from 'react';

import { appConstants } from '../../app.constants';
import { EmptyProps, EmptyState } from '../../models';


export class DevTools extends React.Component<EmptyProps, EmptyState> {
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

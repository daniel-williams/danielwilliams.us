import * as React from 'react';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Breakpoint } from './breakpoint.types';

const EVENT_RESIZE = `resize`

const getSize = () => {
  const {
    clientHeight: height = 0,
    clientWidth: width = 0,
  } = window.document.body || {};

  return { height, width };
}

interface BreakpointServiceProps {
  children: (breakpoint: Breakpoint) => any,
}

interface BreakpointServiceState {
  breakpoint: Breakpoint,
}

export class BreakpointService extends React.Component<BreakpointServiceProps, BreakpointServiceState> {
  resize$: Observable<any>;
  subs: Subscription[] = [];

  constructor(props) {
    super(props);

    this.state = { breakpoint: Breakpoint.LG };
  }

  componentDidMount() {
    if(window) {
      this.resize$ = Observable.fromEvent(window, EVENT_RESIZE).debounceTime(100).map(getSize);
      this.subs.push(this.resize$.subscribe(this.onResize));
      this.onResize(getSize());
    }
  }

  componentWillUnmount() {
    this.subs.forEach(x => x.unsubscribe());
  }

  render() {
    const { children } = this.props;
    const { breakpoint } = this.state;

    return children(breakpoint);
  }

  onResize = (dimensions) => {
    const { width } = dimensions;
    const { breakpoint } = this.state;
    let nextBreakpoint = breakpoint;

    if(width <= 576) {
      nextBreakpoint = Breakpoint.XS;
    } else if( width <= 768) {
      nextBreakpoint = Breakpoint.SM;
    } else if( width <= 992) {
      nextBreakpoint = Breakpoint.MD;
    } else if( width <= 1200) {
      nextBreakpoint = Breakpoint.LG;
    } else {
      nextBreakpoint = Breakpoint.XL;
    }

    if(breakpoint !== nextBreakpoint) {
      this.setState({
        breakpoint: nextBreakpoint,
      });
    }
  }
}
import * as React from 'react';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Breakpoint } from './breakpoint.types';

let resize$: Observable<any> = null;

const EVENT_RESIZE = `resize`;
const RESIZE_DEBOUNCE_INTEVAL = 100;
const getViewportDimensions = () => {
  const {
    clientWidth: width = 0,
    clientHeight: height = 0,
  } = window.document.body || {};

  return { width, height };
}
const initResizeEventStream = () => {
  if(!resize$) {
    resize$ = Observable
      .fromEvent(window, EVENT_RESIZE)
      .debounceTime(RESIZE_DEBOUNCE_INTEVAL)
      .map(getViewportDimensions);
  }
};


interface BreakpointServiceProps {
  children: (breakpoint: Breakpoint) => any,
}

interface BreakpointServiceState {
  breakpoint: Breakpoint,
}

export class BreakpointService extends React.Component<BreakpointServiceProps, BreakpointServiceState> {
  subs: Subscription[] = [];

  constructor(props) {
    super(props);

    this.state = { breakpoint: Breakpoint.LG };
  }

  componentDidMount() {
    initResizeEventStream();
    this.onResize(getViewportDimensions());

    this.subs.push(resize$.subscribe(this.onResize));
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
import * as React from 'react';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Breakpoints, Viewport } from './viewport.types';

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


interface ViewportServiceProps {
  children: (viewport: Viewport) => any,
}

interface ViewportServiceState {
  viewport: Viewport,
}

export class ViewportService extends React.Component<ViewportServiceProps, ViewportServiceState> {
  subs: Subscription[] = [];

  constructor(props) {
    super(props);

    this.state = { viewport: new Viewport() };
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
    const { viewport } = this.state;

    return children(viewport);
  }

  onResize = (dimensions) => {
    const { width, height } = dimensions;
    const { viewport } = this.state;

    let nextBreakpoint = Breakpoints.XL;

    if(width <= 576) {
      nextBreakpoint = Breakpoints.XS;
    } else if( width <= 768) {
      nextBreakpoint = Breakpoints.SM;
    } else if( width <= 992) {
      nextBreakpoint = Breakpoints.MD;
    } else if( width <= 1200) {
      nextBreakpoint = Breakpoints.LG;
    }

    if(viewport.breakpoint !== nextBreakpoint
      || viewport.dimensions.width !== width
      || viewport.dimensions.height !== height) {
      this.setState({
        viewport: new Viewport(nextBreakpoint, {width, height}),
      });
    }
  }
}
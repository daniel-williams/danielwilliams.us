import * as React from 'react';
import * as classNames from 'classnames';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { NavItem } from './nav-item.component';
import { linkData, NavMode } from './nav.types';
import * as styles from './nav.component.scss';


const EVENT_RESIZE = `resize`

const getSize = () => {
  const {
    clientHeight: height = 0,
    clientWidth: width = 0,
  } = window.document.body || {};

  return { height, width };
}

interface NavProps {}
interface NavState {
  navMode: NavMode,
}

export class Nav extends React.Component<NavProps, NavState> {
  resize$: Observable<any>;
  subs: Subscription[] = [];

  constructor(props) {
    super(props);

    this.state = {
      navMode: NavMode.Full,
    };
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
    const { navMode } = this.state;
    const items = linkData.map(x => <NavItem key={x.path} data={x}></NavItem>);
    const names = classNames(styles.navWrap, {
      [styles.compact]: navMode === NavMode.Compact,
    });

    return (
      <div className={names}>
        {items}
        <button onClick={this.toggleMode}>toggle</button>
      </div>
    );
  }

  toggleMode = (evt) => {
    const mode = this.state.navMode === NavMode.Full
      ? NavMode.Compact
      : NavMode.Full;

    this.setState({
      navMode: mode,
    });
  }

  onResize = (dimensions) => {
    const { width, height } = dimensions;
    const { navMode } = this.state;

    if(navMode === NavMode.Compact && width >= 768) {
      this.setState({
        navMode: NavMode.Full,
      });
    } else if(navMode === NavMode.Full && width < 768) {
      this.setState({
        navMode: NavMode.Compact,
      });
    }
  }
}

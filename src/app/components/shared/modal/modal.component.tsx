import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';
import * as gsap from 'gsap';

import * as styles from './modal.component.scss';


interface ModalProps {
  onClicked: (e: any) => void,
  onInComplete: () => void,
  onOutComplete: () => void,
}

class Modal extends React.Component<ModalProps, any> {
  backgroundEl;
  contentWrapEl;
  inTimeline;
  outTimeline;

  render() {
    const { children, onClicked } = this.props;

    return (
      <div className={styles.modalWrap}>
        <div
          ref={el => this.backgroundEl = el}
          className={styles.background}
          onClick={onClicked}></div>
        <div
          ref={el => this.contentWrapEl = el}
          className={styles.content}>
          {children}
        </div>
      </div>
    );
  }

  componentWillAppear(cb) {
    const { TimelineLite, TweenLite } = gsap;

    this.inTimeline = new TimelineLite({
      onComplete: () => this.onTransitionInComplete(cb),
    });
    this.inTimeline.pause();

    // modal fade In
    this.inTimeline.add(TweenLite.fromTo(this.backgroundEl, 0.5, {
      opacity: 0,
    }, {
      opacity: 1,
    }));

    // content fade In
    this.inTimeline.add(TweenLite.fromTo(this.contentWrapEl, 0.5, {
      opacity: 0,
      scale: 1.1,
    }, {
      opacity: 1,
      scale: 1,
    }));

    this.inTimeline.play();
  }

  componentWillLeave(cb) {
    const { TimelineLite, TweenLite } = gsap;

    this.outTimeline = new TimelineLite({
      onComplete: () => this.onTransitionOutComplete(cb),
    });
    this.outTimeline.pause();

    // content fade out
    this.outTimeline.add(TweenLite.fromTo(this.contentWrapEl, 0.5, {
      opacity: 1,
      scale: 1,
    }, {
      opacity: 0,
      scale: 1.1,
    }));

    // modal fade out
    this.outTimeline.add(TweenLite.fromTo(this.backgroundEl, 0.5, {
      opactity: 1,
    }, {
      opacity: 0,
    }));

    this.outTimeline.play();
  }

  onTransitionInComplete(cb) {
    this.props.onInComplete();
    cb();
  }

  onTransitionOutComplete(cb) {
    this.props.onOutComplete();
    cb();
  }
}

let modalEl: Element;
interface TransitionModalProps {
  children?: any,
  onClosed?: () => void,
}
interface TransitionModalState {
  active: boolean,
  content: React.ReactNode,
}

export class TransitionModal extends React.Component<TransitionModalProps, TransitionModalState> {
  _el;
  _isMounted: boolean;

  static get DefaultProps() {
    return {
      onClosed: () => {}, // noop
    };
  }

  constructor(props: TransitionModalProps) {
    super(props);

    const root = document.getElementById('root');
    modalEl = root.childNodes.item(1) as Element;

    this._el = document.createElement('div');

    this.state = {
      active: true,
      content: null,
    };
  }

  componentDidMount() {
    this.setContent(this.props.children);
    modalEl.appendChild(this._el);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    modalEl.removeChild(this._el);
  }


  componentWillReceiveProps(nextProps: React.Props<TransitionModalProps>) {
    this.setContent(nextProps.children);
  }

  setContent(content: React.ReactNode) {
    this.setState({
      content
    });
  }

  render() {
    const { active, content } = this.state;

    if(!content) { return null; }

    const modal = active && (
      <Modal
        onClicked={this.handleClick}
        onInComplete={this.handleInComplete}
        onOutComplete={this.handleOutComplete}>
        {content}
      </Modal>
    );

    return ReactDOM.createPortal(
      <TransitionGroup component='div'>
        {modal}
      </TransitionGroup>, this._el);
  }

  handleClick = (e: any) => {
    this.setState({
      active: false,
    });
  }

  handleInComplete = () => {
    console.log('handleInComplete');
  }

  handleOutComplete = () => {
    console.log('handleOutComplete');

    this.setState({
      content: null,
    }, this.props.onClosed);
  }
}

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';
import * as gsap from 'gsap';

import * as styles from './modal.component.scss';


class Modal extends React.Component<any, any> {
  backgroundEl;
  contentWrapEl;
  inTimeline;
  outTimeline;

  componentWillAppear(cb) {
    const { TimelineLite, TweenLite } = gsap;

    this.inTimeline = new TimelineLite({
      onComplete: this.onTransitionInComplete(cb),
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
    }), "+=0.5");

    this.inTimeline.play();
  }

  componentWillLeave(cb) {
    console.log('componentWillLeave');
    const { TimelineLite, TweenLite } = gsap;

    this.outTimeline = new TimelineLite({
      onComplete: this.onTransitionOutComplete(cb),
    });
    this.outTimeline.pause();

    // content fade out
    this.outTimeline.add(TweenLite.fromTo(this.contentWrapEl, 0.5, {
      opacity: 1,
      scale: 1,
    }, {
      opacity: 0,
      scale: 1.1,
    }), "+=0.0");

    // modal fade out
    this.outTimeline.add(TweenLite.fromTo(this.backgroundEl, 0.5, {
      opactity: 1,
    }, {
      opacity: 0,
    }), "+=0.5");

    this.outTimeline.play();
  }

  render() {
    const { children } = this.props;

    return (
      <div className={styles.modalWrap}>
        <div ref={el => this.backgroundEl = el} className={styles.background}></div>
        <div ref={el => this.contentWrapEl = el} className={styles.content}>
          {children}
        </div>
      </div>
    );
  }

  onTransitionInComplete(cb) {
    console.log('transition in complete');
    cb();
  }

  onTransitionOutComplete(cb) {
    console.log('transition out complete');
    cb();
  }
}

let modalEl: Element;
interface TransitionModalProps {
  modalKey: string,
  click: Function,
}
interface TransitionModalState {}

export class TransitionModal extends React.Component<TransitionModalProps, TransitionModalState> {
  el;

  getDefaultProps() {
    return {
      modalKey: 'default',
      click: () => { }
    };
  }

  constructor(props: TransitionModalProps) {
    super(props);

    const root = document.getElementById('root');
    modalEl = root.childNodes.item(1) as Element;

    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalEl.appendChild(this.el);
  }

  componentWillUnMount() {
    modalEl.removeChild(this.el);
  }

  render() {
    const { children, click, modalKey } = this.props;

    return ReactDOM.createPortal(
      <TransitionGroup component='div' onClick={click}>
        <Modal key={modalKey}>
          {children}
        </Modal>
      </TransitionGroup>, this.el);
  }
}

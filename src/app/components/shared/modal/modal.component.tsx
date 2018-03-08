import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';
import * as gsap from 'gsap';

import * as styles from './modal.component.scss';


interface ModalProps {
  onClicked: (e: any) => void,
}

class Modal extends React.Component<ModalProps, any> {
  backgroundEl;
  contentWrapEl;
  inTimeline;
  outTimeline;

  constructor(props: ModalProps) {
    super(props);
  }

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
    cb();
  }

  onTransitionOutComplete(cb) {
    cb();
  }
}

let modalEl: Element;
interface TransitionModalProps {
  active: boolean,
  onDeactivated?: () => void,
  onClicked?: (e: any) => void,
}
interface TransitionModalState {}

export class TransitionModal extends React.Component<TransitionModalProps, TransitionModalState> {
  el;

  static get DefaultProps() {
    return {
      active: true,
      onDeactivated: () => { console.log('noop'); },
      onClicked: (e) => { console.log('noop'); },
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

  componentWillReceiveProps(nextProps: TransitionModalProps) {
    console.log('nextProps: ', nextProps);
  }

  render() {
    const { active, children, onClicked } = this.props;
    const modal = active
      ? (
        <Modal onClicked={onClicked}>
          {children}
        </Modal>
      ) : null;

    return ReactDOM.createPortal(
      <TransitionGroup component='div'>
        {modal}
      </TransitionGroup>, this.el);
  }
}

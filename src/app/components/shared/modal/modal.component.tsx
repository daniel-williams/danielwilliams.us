import * as React from 'react';
import * as gsap from 'gsap';

import Constants from '../../../app-constants';
import * as styles from './modal.component.scss';


const { minWidth, maxWidth, duration } = Constants.modal;

interface ModalProps {
  onClose: (e: any) => void,
  onInComplete: () => void,
  onOutComplete: (cb) => void,
}

export class Modal extends React.Component<ModalProps, {}> {
  backgroundEl;
  contentWrapEl;
  inTimeline;
  outTimeline;

  render() {
    const { clientWidth = 0, clientHeight = 0 } = window.document.body || {};
    const contentWrapStyle = {
      width: '' + Math.max(Constants.modal.minWidth, Math.min(maxWidth, clientWidth * 0.9)) + 'px',
      height: '' + Math.max(minWidth, Math.min(maxWidth, clientHeight * 0.9)) + 'px',
    };
    const { children, onClose } = this.props;

    return (
      <>
        <div
          ref={el => this.backgroundEl = el}
          className={styles.background}
          onClick={onClose}></div>
        <div
          ref={el => this.contentWrapEl = el}
          className={styles.contentWrap} style={contentWrapStyle}>
          <div className={styles.closeButton} onClick={onClose}><i className="fas fa-times"></i></div>
          <div className={styles.contentScroller}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
        </div>
      </>
    );
  }

  componentWillAppear(cb) {
    const { TimelineLite, TweenLite } = gsap;

    this.inTimeline = new TimelineLite({
      onComplete: () => this.onTransitionInComplete(cb),
    });
    this.inTimeline.pause();

    // modal fade In
    this.inTimeline.add(TweenLite.fromTo(this.backgroundEl, duration, {
      opacity: 0,
    }, {
      opacity: 1,
    }));

    // content fade In
    this.inTimeline.add(TweenLite.fromTo(this.contentWrapEl, duration, {
      opacity: 0,
      scale: 1.1,
    }, {
      opacity: 1,
      scale: 1,
    }), '-=0.2');

    this.inTimeline.play();
  }

  componentWillLeave(cb) {
    const { TimelineLite, TweenLite } = gsap;

    this.outTimeline = new TimelineLite({
      onComplete: () => this.onTransitionOutComplete(cb),
    });
    this.outTimeline.pause();

    // content fade out
    this.outTimeline.add(TweenLite.fromTo(this.contentWrapEl, duration, {
      opacity: 1,
      scale: 1,
    }, {
      opacity: 0,
      scale: 1.1,
    }));

    // modal fade out
    this.outTimeline.add(TweenLite.fromTo(this.backgroundEl, duration, {
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
    this.props.onOutComplete(cb);
  }
}

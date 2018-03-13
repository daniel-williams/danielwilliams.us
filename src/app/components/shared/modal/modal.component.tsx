import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';
import * as gsap from 'gsap';

import * as styles from './modal.component.scss';


interface ModalProps {
  onClose: (e: any) => void,
  onInComplete: () => void,
  onOutComplete: () => void,
}

class Modal extends React.Component<ModalProps, any> {
  backgroundEl;
  contentWrapEl;
  inTimeline;
  outTimeline;

  render() {
    const { clientWidth = 0, clientHeight = 0 } = window.document.body || {};
    const contentWrapStyle = {
      width: '' + Math.max(300, Math.min(1200, clientWidth * 0.9)) + 'px',
      height: '' + Math.max(300, Math.min(1200, clientHeight * 0.9)) + 'px',
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
  onReady?: () => void,
}
interface TransitionModalState {
  active: boolean,
  content: React.ReactNode,
}

export class TransitionModal extends React.Component<TransitionModalProps, TransitionModalState> {
  static get defaultProps() {
    return {
      onClosed: () => {}, // noop
      onReady: () => {}, // noop
    };
  }

  constructor(props: TransitionModalProps) {
    super(props);

    const root = document.getElementById('root');
    modalEl = root.childNodes.item(1) as Element;

    this.state = {
      active: true,
      content: null,
    };
  }

  componentDidMount() {
    this.setContent(this.props.children);
    document.addEventListener("keydown", this.handleEscKey, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscKey, false);
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
        onClose={this.handleClose}
        onInComplete={this.handleInComplete}
        onOutComplete={this.handleOutComplete}>
        {content}
      </Modal>
    );

    return ReactDOM.createPortal(
      <TransitionGroup className={styles.modal} component='div'>
        {modal}
      </TransitionGroup>, modalEl);
  }

  handleClose = (e: any) => {
    this.setState({
      active: false,
    });
  };

  handleInComplete = () => {
    this.props.onReady();
  };

  handleOutComplete = () => {
    this.setState({
      content: null,
    }, this.props.onClosed);
  };

  handleEscKey = (e) => {
    if(e.keyCode === 27) {
      this.handleClose(e);
    }
  }
}

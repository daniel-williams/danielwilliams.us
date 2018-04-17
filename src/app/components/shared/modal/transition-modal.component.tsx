import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';

import { Modal } from './modal.component';
import * as styles from './modal.component.scss';


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
    // TODO: refering to position because id is dynamic as a result of using
    //       CSS modules. Need to find a better solution.
    modalEl = root.childNodes.item(1) as Element;

    this.state = {
      active: true,
      content: null,
    };

    this.handleInComplete = this.handleInComplete.bind(this);
    this.handleOutComplete = this.handleOutComplete.bind(this);
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

  handleOutComplete = (cb) => {
    this.setState({
      content: null,
    }, () => {
      this.props.onClosed();
      cb();
    });
  };

  handleEscKey = (e) => {
    if(e.keyCode === 27) {
      this.handleClose(e);
    }
  }
}

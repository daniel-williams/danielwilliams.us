import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as classNames from 'classnames';

import { stores, ModalStore } from '../../stores';

import { TransitionModal, VideoPlayer } from '../shared';
import * as styles from './about.component.scss';


interface AboutState {
  content: React.ReactNode,
  ready: boolean,
  showModal: boolean,
}

@inject(stores.modal)
@observer
export class About extends React.Component<{}, AboutState> {
  modalStore: ModalStore;

  constructor(props: any) {
    super(props);

    this.modalStore = this.props[stores.modal];
    this.state = {
      content: null,
      ready: false,
      showModal: false,
    };
  }

  render() {
    const { content, ready, showModal } = this.state;
    const names = classNames(styles.modalContent, {[styles.ready]: ready});
    const modal = showModal && (
      <TransitionModal
        onClosed={this.handleModalClosed}
        onReady={this.handleReady}>
        <div className={styles.contentFrame}>
          <div className={names}>
            {content}
          </div>
        </div>
      </TransitionModal>
    );

    return (
      <div className={styles.aboutWrap}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis unde consequatur soluta molestiae non adipisci necessitatibus repellendus beatae quod cupiditate quisquam eos doloremque vero ex quaerat doloribus, odio harum explicabo?</p>
        <p>Cum iusto, provident velit autem et amet dignissimos maxime quibusdam, modi architecto, nam minima! Sit perferendis, commodi minus possimus laboriosam doloremque optio illum velit iusto unde nostrum! Harum, et obcaecati!</p>
        <button onClick={() => this.handleShowModal(modal1Content)}>Modal One</button>
        <button onClick={() => this.handleShowModal(modal2Content)}>Modal Two</button>
        {modal}
      </div>
    );
  }

  handleShowModal = (content) => {
    this.setState({
      content: content(),
      showModal: true,
    });
  }

  handleReady = () => {
    this.setState({
      ready: true,
    });
  }

  handleModalClosed = () => {
    this.setState({
      content: null,
      ready: false,
      showModal: false,
    });
  }
}

const modal1Content = () => (
  <>
    <h1>Modal 1 content</h1>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
    <div>some modal content for testing</div>
  </>
);

const modal2Content = () => (
  <>
    <h1>Modal 2 content</h1>
    <VideoPlayer src='/assets/videos/test1.mp4' autoPlay />
    <div>some modal content for testing</div>

  </>
);
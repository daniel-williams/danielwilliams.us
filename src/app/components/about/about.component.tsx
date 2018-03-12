import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { stores, ModalStore } from '../../stores';

import { TransitionModal } from '../shared';
import * as styles from './about.component.scss';


interface AboutState {
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
      showModal: false
    };
  }

  render() {
    const { showModal } = this.state;

    const modal = showModal && (
      <TransitionModal onClosed={this.handleModalClosed}>
        <div>some modal content for testing</div>
      </TransitionModal>
    );

    return (
      <div className={styles.aboutWrap}>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis unde consequatur soluta molestiae non adipisci necessitatibus repellendus beatae quod cupiditate quisquam eos doloremque vero ex quaerat doloribus, odio harum explicabo?</p>
          <p>Cum iusto, provident velit autem et amet dignissimos maxime quibusdam, modi architecto, nam minima! Sit perferendis, commodi minus possimus laboriosam doloremque optio illum velit iusto unde nostrum! Harum, et obcaecati!</p>
          <button onClick={this.handleShowModal}>open</button>
        </div>
        {modal}
      </div>
    );
  }

  handleShowModal = (e) => {
    this.setState({
      showModal: true,
    });
  }

  handleModalClosed = () => {
    this.setState({
      showModal: false,
    });
  }
}
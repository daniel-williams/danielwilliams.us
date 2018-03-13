import { action, computed , observable, reaction } from 'mobx';


export class ModalStore {
  @observable active: boolean = false;

  @action
  activate = () => {
    this.active = true;
  }

  @action
  deactivate = () => {
    this.active = false;
  }
}

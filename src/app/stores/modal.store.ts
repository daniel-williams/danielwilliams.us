import { action, computed , observable, reaction } from 'mobx';


export class ModalStore {
  @observable active: boolean = false;

  @action
  activate = () => {
    console.log('activate modal');
    this.active = true;
  }

  @action
  deactivate = () => {
    console.log('deactivate modal');
    this.active = false;
  }
}

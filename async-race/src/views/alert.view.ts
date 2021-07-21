import BaseView from './base.view';
import '../styles/alert.scss';

export default class AlertView extends BaseView {
  private errorBoxEl: HTMLElement;

  private errorMessageEl: HTMLElement;

  private okBtnEl: HTMLButtonElement;

  constructor() {
    super();
    this.errorBoxEl = AlertView.buildNode('div', 'alert-box', null);
    const errorWindowEl = AlertView.buildNode(
      'div',
      'alert-window',
      this.errorBoxEl,
    );
    this.errorMessageEl = AlertView.buildNode(
      'p',
      'alert-message',
      errorWindowEl,
    );
    this.okBtnEl = AlertView.buildNode(
      'button',
      'alert-btn',
      errorWindowEl,
    ) as HTMLButtonElement;
    this.okBtnEl.innerHTML = 'OK';
  }

  show(text: string): void {
    const rootEl = document.querySelector('#root');
    rootEl.appendChild(this.errorBoxEl);
    this.errorMessageEl.innerHTML = text;
  }

  hide(): void {
    this.errorBoxEl.innerHTML = '';
  }

  okBtnElBind(callBack: () => void): void {
    this.okBtnEl.addEventListener('click', () => callBack());
  }
}

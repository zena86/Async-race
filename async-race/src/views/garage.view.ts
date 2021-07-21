import BaseView from './base.view';

export default class GarageView extends BaseView {
  private garageEl: HTMLElement;

  constructor() {
    super();
    this.garageEl = GarageView.buildNode('div', 'garage', null);
  }

  show(): void {
    const pageEl = document.querySelector('.page');
    pageEl.appendChild(this.garageEl);
  }
}

import '../styles/dashboard.scss';
import BaseView from './base.view';

export default class DashboardView extends BaseView {
  private dashboardEl: HTMLElement;

  private createNameInputEl: HTMLInputElement;

  private createColorInputEl: HTMLInputElement;

  private createBtnEl: HTMLButtonElement;

  private updateNameInputEl: HTMLInputElement;

  private updateColorInputEl: HTMLInputElement;

  private updateBtnEl: HTMLButtonElement;

  private raceBtnEl: HTMLButtonElement;

  private resetBtnEl: HTMLButtonElement;

  private generateBtnEl: HTMLButtonElement;

  constructor() {
    super();
    this.dashboardEl = DashboardView.buildNode('div', 'dashboard', null);
    /* Create car */
    const createRowEl = DashboardView.buildNode('div', 'row', this.dashboardEl);
    this.createNameInputEl = DashboardView.buildNode(
      'input',
      'input__row',
      createRowEl,
      { type: 'text', name: 'brand-created', placeholder: 'Сar brand' },
    ) as HTMLInputElement;
    this.createColorInputEl = DashboardView.buildNode(
      'input',
      'car-color',
      createRowEl,
      {
        type: 'color',
        id: 'create-color',
        name: 'color-created',
        value: '#646464',
      },
    ) as HTMLInputElement;
    this.createBtnEl = DashboardView.buildNode(
      'button',
      'btn_secondary',
      createRowEl,
    ) as HTMLButtonElement;
    this.createBtnEl.innerHTML = 'create';
    /* Update car */
    const updateRowEl = DashboardView.buildNode('div', 'row', this.dashboardEl);
    this.updateNameInputEl = DashboardView.buildNode(
      'input',
      'input__row',
      updateRowEl,
      { type: 'text', name: 'brand-create', placeholder: 'Сar brand' },
    ) as HTMLInputElement;
    this.updateColorInputEl = DashboardView.buildNode(
      'input',
      'car-color',
      updateRowEl,
      {
        type: 'color',
        id: 'create-color',
        name: 'color-update',
        value: '#646464',
      },
    ) as HTMLInputElement;
    this.updateBtnEl = DashboardView.buildNode(
      'button',
      'btn_secondary',
      updateRowEl,
    ) as HTMLButtonElement;
    this.updateBtnEl.innerHTML = 'update';
    /* Controls btn */
    const controlRowEl = DashboardView.buildNode(
      'div',
      'row',
      this.dashboardEl,
    );
    this.raceBtnEl = DashboardView.buildNode(
      'button',
      'btn_secondary',
      controlRowEl,
    ) as HTMLButtonElement;
    this.raceBtnEl.innerHTML = 'race';
    this.resetBtnEl = DashboardView.buildNode(
      'button',
      'btn_secondary disabled',
      controlRowEl,
    ) as HTMLButtonElement;
    this.resetBtnEl.innerHTML = 'reset';
    this.generateBtnEl = DashboardView.buildNode(
      'button',
      'btn_secondary',
      controlRowEl,
    ) as HTMLButtonElement;
    this.generateBtnEl.innerHTML = 'generate cars';
  }

  show(): void {
    const garageEl = document.querySelector('.garage');
    garageEl.appendChild(this.dashboardEl);
  }

  createBtnClickBind(callBack: () => void): void {
    this.createBtnEl.addEventListener('click', () => callBack());
  }

  updateBtnClickBind(callBack: () => void): void {
    this.updateBtnEl.addEventListener('click', () => callBack());
  }

  generateBtnClickBind(callBack: () => void): void {
    this.generateBtnEl.addEventListener('click', () => callBack());
  }

  raceBtnClickBind(callBack: () => void): void {
    this.raceBtnEl.addEventListener('click', () => callBack());
  }

  resetBtnClickBind(callBack: () => void): void {
    this.resetBtnEl.addEventListener('click', () => callBack());
  }

  /* CREATE INPUTS */
  get createName(): string {
    return this.createNameInputEl.value;
  }

  set createName(newValue: string) {
    this.createNameInputEl.value = newValue;
  }

  get createColor(): string {
    return this.createColorInputEl.value;
  }

  set createColor(newValue: string) {
    this.createColorInputEl.value = newValue;
  }

  /* UPDATE INPUTS */
  get updateName(): string {
    return this.updateNameInputEl.value;
  }

  set updateName(newValue: string) {
    this.updateNameInputEl.value = newValue;
  }

  get updateColor(): string {
    return this.updateColorInputEl.value;
  }

  set updateColor(newValue: string) {
    this.updateColorInputEl.value = newValue;
  }

  /* DISABLED BTN */
  disableRaceBtn(): void {
    this.raceBtnEl.classList.add('disabled');
  }

  disableResetBtn(): void {
    this.resetBtnEl.classList.add('disabled');
  }

  enableRaceBtn(): void {
    this.raceBtnEl.classList.remove('disabled');
  }

  enableResetBtn(): void {
    this.resetBtnEl.classList.remove('disabled');
  }
}

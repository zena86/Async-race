import '../styles/navigation.scss';
import BaseView from './base.view';

export default class NavigationView extends BaseView {
  private toGarageBtn: HTMLButtonElement;

  private toWinnersBtn: HTMLButtonElement;

  constructor() {
    super();
    const navigationEl = document.querySelector('.navigation');
    const navBtnsEl = NavigationView.buildNode('div', 'nav-btns', navigationEl);
    this.toGarageBtn = NavigationView.buildNode(
      'button',
      'btn btn_left',
      navBtnsEl,
    ) as HTMLButtonElement;
    this.toGarageBtn.innerHTML = 'To garage';
    this.toWinnersBtn = NavigationView.buildNode(
      'button',
      'btn',
      navBtnsEl,
    ) as HTMLButtonElement;
    this.toWinnersBtn.innerHTML = 'To winners';
  }

  /* BTN BIND */
  toGarageBtnClickBind(callBack: () => void): void {
    this.toGarageBtn.addEventListener('click', () => callBack());
  }

  toWinnersBtnClickBind(callBack: () => void): void {
    this.toWinnersBtn.addEventListener('click', () => callBack());
  }

  /* Color btns */
  colorToGarageBtn(): void {
    this.toWinnersBtn.classList.remove('active-btn');
    this.toGarageBtn.classList.add('active-btn');
  }

  colorToWinnersBtn(): void {
    this.toGarageBtn.classList.remove('active-btn');
    this.toWinnersBtn.classList.add('active-btn');
  }
}

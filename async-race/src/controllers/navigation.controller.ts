import NavigationView from '../views/navigation.view';

export default class NavigationController {
  private navigationView: NavigationView;

  constructor(navigationView: NavigationView) {
    this.navigationView = navigationView;
  }

  toGarageBtnClickBind(callback: () => void): void {
    this.navigationView.toGarageBtnClickBind(callback);
  }

  toWinnersBtnClickBind(callback: () => void): void {
    this.navigationView.toWinnersBtnClickBind(callback);
  }

  colorToGarageBtn(): void {
    this.navigationView.colorToGarageBtn();
  }

  colorToWinnersBtn(): void {
    this.navigationView.colorToWinnersBtn();
  }
}

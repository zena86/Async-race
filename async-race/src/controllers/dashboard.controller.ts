import Car from '../models/car.model';
import RaceService from '../services/race.service';
import DashboardView from '../views/dashboard.view';
import AlertController from './alert.controller';
import CreateBtnController from './createBtn.controller';

export default class DashboardController {
  private createBtnController: CreateBtnController;

  constructor(
    private dashboardView: DashboardView,
    private raceService: RaceService,
    private alertController: AlertController,
  ) {
    this.createBtnController = new CreateBtnController(
      this.raceService,
      this.alertController,
    );

    this.dashboardView.createBtnClickBind(() => {
      this.createBtnController.createCar(
        this.dashboardView.createName,
        this.dashboardView.createColor,
      );
    });
  }

  updateBtnClickBind(callBack: () => void): void {
    this.dashboardView.updateBtnClickBind(callBack);
  }

  generateBtnClickBind(callBack: () => void): void {
    this.dashboardView.generateBtnClickBind(callBack);
  }

  raceBtnClickBind(callBack: () => void): void {
    this.dashboardView.raceBtnClickBind(callBack);
  }

  resetBtnClickBind(callBack: () => void): void {
    this.dashboardView.resetBtnClickBind(callBack);
  }

  show(): void {
    this.dashboardView.show();
  }

  markAsSelected(car: Car): void {
    this.dashboardView.updateColor = car.color;
    this.dashboardView.updateName = car.name;
  }

  get updateColor(): string {
    return this.dashboardView.updateColor;
  }

  get updateName(): string {
    return this.dashboardView.updateName;
  }

  disableRaceBtn(): void {
    this.dashboardView.disableRaceBtn();
  }

  disableResetBtn(): void {
    this.dashboardView.disableResetBtn();
  }

  enableRaceBtn(): void {
    this.dashboardView.enableRaceBtn();
  }

  enableResetBtn(): void {
    this.dashboardView.enableResetBtn();
  }
}

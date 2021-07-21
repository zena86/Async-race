import Car from '../models/car.model';
import RaceService from '../services/race.service';
import AlertController from './alert.controller';
import DashboardController from './dashboard.controller';
import TrackpoolController from './trackpool.controller';

export default class UpdateBtnController {
  private selectedCar: Car;

  private alertController: AlertController;

  private raceService: RaceService;

  private trackpoolController: TrackpoolController;

  private dashboardController: DashboardController;

  constructor(
    trackpoolController: TrackpoolController,
    dashboardController: DashboardController,
    alertController: AlertController,
    raceService: RaceService,
  ) {
    this.trackpoolController = trackpoolController;
    this.dashboardController = dashboardController;
    this.alertController = alertController;
    this.raceService = raceService;
    this.trackpoolController.markAsSelectedBind((car: Car) => {
      this.markAsSelected(car);
    });
  }

  async updateCar(): Promise<void> {
    if (!this.selectedCar) {
      this.alertController.show('Please, select a car!');
      return;
    }
    try {
      this.selectedCar.color = this.dashboardController.updateColor;
      this.selectedCar.name = this.dashboardController.updateName;
      await this.raceService.updateCar(this.selectedCar);
      this.trackpoolController.updatePage();
    } catch (error) {
      this.alertController.show(`Error!: ${error}`);
    }
  }

  markAsSelected(car: Car): void {
    this.dashboardController.markAsSelected(car);
    this.selectedCar = car;
  }
}

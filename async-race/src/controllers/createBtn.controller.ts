import Car from '../models/car.model';
import RaceService from '../services/race.service';
import AlertController from './alert.controller';

export default class CreateBtnController {
  private raceService: RaceService;

  private alertController: AlertController;

  constructor(raceService: RaceService, alertController: AlertController) {
    this.raceService = raceService;
    this.alertController = alertController;
  }

  async createCar(name: string, color: string): Promise<void> {
    const carRequest = new Car();
    carRequest.name = name;
    carRequest.color = color;
    try {
      await this.raceService.createCars([carRequest]);
    } catch (error) {
      this.alertController.show(`Error!: ${error}`);
    }
  }
}

import Car from '../models/car.model';
import CarGenerator from '../services/cargenerator.service';
import RaceService from '../services/race.service';
import AlertController from './alert.controller';

export default class GenerateBtnController {
  private raceService: RaceService;

  private alertController: AlertController;

  private carGenerator: CarGenerator;

  constructor(raceService: RaceService, alertController: AlertController) {
    this.raceService = raceService;
    this.alertController = alertController;
    this.carGenerator = new CarGenerator();
  }

  async generateCar(): Promise<void> {
    try {
      await this.raceService.createCars(this.createRandomCarsArr(100));
    } catch (error) {
      this.alertController.show(`Error!: ${error}`);
    }
  }

  createRandomCarsArr(carAmount: number): Car[] {
    const carArr = [];
    for (let i = 0; i < carAmount; i += 1) {
      const car = new Car();
      car.name = this.carGenerator.generateName();
      car.color = CarGenerator.generateColor();
      carArr.push(car);
    }
    return carArr;
  }
}

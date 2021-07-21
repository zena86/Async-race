import { Status } from '../services/constants';
import RaceService from '../services/race.service';
import TrackView from '../views/track.view';
import AlertController from './alert.controller';

export default class StopBtnController {
  constructor(
    private raceService: RaceService,
    private alertController: AlertController,
    private trackView: TrackView,
  ) {}

  stopCar(): void {
    this.trackView.car.isDriving = false;
    this.trackView.car.isStopped = true;
  }

  resetCar(): void {
    const { id } = this.trackView.car;
    try {
      this.raceService.startStopEngine(id, Status.stopped).then(() => {
        this.stopCar();
        requestAnimationFrame(() => {
          this.trackView.resetCar();
        });
        this.trackView.disableBBtn();
        this.trackView.enableABtn();
      });
    } catch (error) {
      this.alertController.show(`Error!: ${error}`);
    }
  }
}

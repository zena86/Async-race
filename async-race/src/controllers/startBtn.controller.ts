import { ErrorCode, Status } from '../services/constants';
import ServerError from '../services/error';
import RaceService from '../services/race.service';
import TrackView from '../views/track.view';
import AlertController from './alert.controller';

export default class StartBtnController {
  constructor(
    private raceService: RaceService,
    private alertController: AlertController,
    private trackView: TrackView,
  ) {}

  startCar(stopCarCallBack: () => void, carFinishedCallBack: () => void): void {
    this.trackView.car.isDriving = true;
    this.trackView.car.isStopped = false;
    this.raceService
      .startStopEngine(this.trackView.car.id, Status.started)
      .then((startParams: { velocity: number; distance: number }) => {
        this.animateCar(
          startParams.velocity,
          startParams.distance,
          carFinishedCallBack,
        );
        this.raceService
          .switchEngineToDrive(this.trackView.car.id, Status.drive)
          .catch((error: ServerError) => {
            if (error.code === ErrorCode.internalServerError) {
              stopCarCallBack();
              this.trackView.car.isStopped = true;
            }
          });
      })
      .catch((error: ServerError) => {
        this.alertController.show(error.message);
      });
  }

  private animateCar(
    velocity: number,
    distance: number,
    carFinishedCallBack: () => void,
  ): void {
    const start = performance.now();
    const iterationFunc = () => {
      const realDurationMs = performance.now() - start;
      const expectedDurationMs = distance / velocity;
      this.trackView.drawDriveCar(realDurationMs, expectedDurationMs);
      if (realDurationMs < expectedDurationMs && this.trackView.car.isDriving) {
        requestAnimationFrame(iterationFunc);
      } else {
        this.trackView.car.timeSec = expectedDurationMs / 1000;
        if (carFinishedCallBack) carFinishedCallBack();
      }
    };
    requestAnimationFrame(iterationFunc);
  }
}

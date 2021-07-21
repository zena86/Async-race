import Car from '../models/car.model';
import RaceService from '../services/race.service';
import WinnerService from '../services/winner.service';
import TrackView from '../views/track.view';
import StartBtnController from './startBtn.controller';
import AlertController from './alert.controller';
import StopBtnController from './stopBtn.controller';

export default class TrackController {
  private startBtnController: StartBtnController;

  private stopBtnController: StopBtnController;

  public isDriving: boolean;

  public carFinishedCallBack: () => void;

  constructor(
    private trackView: TrackView,
    private raceService: RaceService,
    private winnerService: WinnerService,
    private alertController: AlertController,
  ) {
    this.isDriving = true;

    this.startBtnController = new StartBtnController(
      this.raceService,
      this.alertController,
      this.trackView,
    );

    this.stopBtnController = new StopBtnController(
      this.raceService,
      alertController,
      this.trackView,
    );

    this.trackView.aBtnClickBind(() => {
      this.trackView.disableABtn();
      this.startBtnController.startCar(() => {
        this.stopCar();
      }, this.carFinishedCallBack);
      this.disableABtn();
      this.enableBBtn();
    });

    this.trackView.bBtnClickBind(() => {
      this.isDriving = false;
      this.trackView.disableBBtn();
      this.resetCar();
    });

    this.trackView.removeBtnClickBind(() => {
      const { id } = trackView.car;
      this.raceService.deleteCar(id);
      this.winnerService.deleteWinner(id);
    });
  }

  get car(): Car {
    return this.trackView.car;
  }

  show(): void {
    this.trackView.show();
  }

  selectBtnClickBind(callBack: () => void): void {
    this.trackView.selectBtnClickBind(callBack);
  }

  resetCar(): void {
    this.stopBtnController.resetCar();
  }

  showWinMessage(car: Car): void {
    const time = car.timeSec.toFixed(2);
    const winMsg = `${car.name} went first [${time} sec]`;
    this.trackView.drowWinMessage(winMsg);
  }

  hideWinMessage(): void {
    this.trackView.hideWinMessage();
  }

  startCar(): void {
    this.startBtnController.startCar(() => {
      this.stopCar();
    }, this.carFinishedCallBack);
  }

  stopCar(): void {
    this.stopBtnController.stopCar();
  }

  carFinishedBind(callBack: () => void): void {
    this.carFinishedCallBack = callBack;
  }

  disableABtn(): void {
    this.trackView.disableABtn();
  }

  enableABtn(): void {
    this.trackView.enableABtn();
  }

  disableBBtn(): void {
    this.trackView.disableBBtn();
  }

  enableBBtn(): void {
    this.trackView.enableBBtn();
  }
}

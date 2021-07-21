import Car from '../models/car.model';
import Winner from '../models/winner.model';
import { ErrorCode } from '../services/constants';
import ServerError from '../services/error';
import RaceService from '../services/race.service';
import WinnerService from '../services/winner.service';
import TrackView from '../views/track.view';
import TrackpoolView from '../views/trackpool.view';
import AlertController from './alert.controller';
import TrackController from './track.controller';

export default class TrackpoolController {
  private trackpoolView: TrackpoolView;

  private raceService: RaceService;

  private winnerService: WinnerService;

  private alertController: AlertController;

  private limit: number;

  private page: number;

  private markAsSelectedCallback: (car: Car) => void;

  private updatePageCallback: () => void;

  private winCallback: () => void;

  private onPageTrackControllers: TrackController[];

  constructor(
    trackpoolView: TrackpoolView,
    raceService: RaceService,
    winnerService: WinnerService,
    alertController: AlertController,
  ) {
    this.trackpoolView = trackpoolView;
    this.raceService = raceService;
    this.winnerService = winnerService;
    this.alertController = alertController;
    this.limit = 7;
    this.page = 1;
    /* On click pagination btns */
    this.trackpoolView.nextBtnClickBind(() => {
      if (this.limit * this.page < raceService.totalCarsAmount) {
        this.showPage(this.page + 1);
        this.page += 1;
        this.trackpoolView.doOnPaginationBtnClick(this.page);
      }
      this.checkStatusBtn();
      this.updatePageCallback();
    });
    this.trackpoolView.prevBtnClickBind(() => {
      if (this.page > 1) {
        this.showPage(this.page - 1);
        this.page -= 1;
        this.trackpoolView.doOnPaginationBtnClick(this.page);
      }
      this.checkStatusBtn();
      this.updatePageCallback();
    });
    /* Change cars amount */
    this.raceService.carsAmountChangedBind((newCarsAmount) => {
      this.checkStatusBtn();
      this.trackpoolView.setCarsAmount(newCarsAmount);
      this.updatePage();
    });
  }

  show(): void {
    this.trackpoolView.show();
    this.updatePage();
  }

  /* SHOW TRACKS PAGE */
  async showPage(page: number): Promise<void> {
    try {
      const carsOnPageArr = await this.raceService.getCarsOnPage(
        page,
        this.limit,
      );
      this.trackpoolView.clear();
      this.onPageTrackControllers = carsOnPageArr.map((car) => {
        const trackController = new TrackController(
          new TrackView(car),
          this.raceService,
          this.winnerService,
          this.alertController,
        );
        trackController.selectBtnClickBind(() => {
          this.markAsSelectedCallback(car);
        });
        trackController.show();

        return trackController;
      });
    } catch (error) {
      this.alertController.show(`Error!: ${error}`);
    }
  }

  markAsSelectedBind(callBack: (car: Car) => void): void {
    this.markAsSelectedCallback = callBack;
  }

  updatePageBind(callBack: () => void): void {
    this.updatePageCallback = callBack;
  }

  winBind(callBack: () => void): void {
    this.winCallback = callBack;
  }

  updatePage(): void {
    this.showPage(this.page);
  }

  /* Pagination */
  checkStatusBtn(): void {
    const pageAmount = Math.ceil(this.raceService.totalCarsAmount / this.limit);
    if (this.page > 1) {
      this.trackpoolView.enablePrevBtn();
    } else {
      this.trackpoolView.disablePrevBtn();
    }

    if (this.page + 1 > pageAmount) {
      this.trackpoolView.disableNextBtn();
    } else {
      this.trackpoolView.enableNextBtn();
    }
  }

  startRace(): void {
    let isFirstFinished = false;
    this.onPageTrackControllers.forEach((trackController) => {
      trackController.disableABtn();
      trackController.enableBBtn();
      trackController.carFinishedBind(() => {
        if (isFirstFinished) return;
        if (!trackController.car.isStopped) {
          isFirstFinished = true;
          trackController.showWinMessage(trackController.car);
          this.addWinnerToServer(trackController.car);
          this.winCallback();
        }
      });
      trackController.startCar();
    });
  }

  addWinnerToServer(car: Car): void {
    this.winnerService
      .getWinner(car.id)
      .then((winner) => {
        const newWinner = new Winner();
        newWinner.id = winner.id;
        newWinner.time = Math.min(car.timeSec, winner.time);
        newWinner.wins = winner.wins + 1;
        this.winnerService.updateWinner(newWinner);
      })
      .catch((error: ServerError) => {
        if (error.code === ErrorCode.notFound) {
          this.winnerService.createWinner(car);
        } else {
          this.alertController.show(error.message);
        }
      });
  }

  reset(): void {
    this.onPageTrackControllers.forEach((trackController) => {
      trackController.disableBBtn();
      trackController.enableABtn();
      trackController.stopCar();
      trackController.resetCar();
      trackController.hideWinMessage();
    });
  }
}

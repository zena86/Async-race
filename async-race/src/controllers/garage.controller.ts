import RaceService from '../services/race.service';
import WinnerService from '../services/winner.service';
import GarageView from '../views/garage.view';
import TrackpoolView from '../views/trackpool.view';
import AlertController from './alert.controller';
import DashboardController from './dashboard.controller';
import GenerateBtnController from './generateBtnController';
import RaceBtnController from './raceBtnController';
import ResetBtnController from './resetBtnController';
import TrackpoolController from './trackpool.controller';
import UpdateBtnController from './updateBtn.controller';

export default class GarageController {
  private trackpoolController: TrackpoolController;

  private updateBtnController: UpdateBtnController;

  private generateBtnController: GenerateBtnController;

  private raceBtnController: RaceBtnController;

  private resetBtnController: ResetBtnController;

  constructor(
    private garageView: GarageView,
    private raceService: RaceService,
    winnerService: WinnerService,
    private alertController: AlertController,
    private dashboardController: DashboardController,
  ) {
    this.trackpoolController = new TrackpoolController(
      new TrackpoolView(),
      raceService,
      winnerService,
      alertController,
    );

    this.updateBtnController = new UpdateBtnController(
      this.trackpoolController,
      this.dashboardController,
      this.alertController,
      this.raceService,
    );

    this.generateBtnController = new GenerateBtnController(
      this.raceService,
      this.alertController,
    );

    this.raceBtnController = new RaceBtnController(
      this.trackpoolController,
      this.dashboardController,
    );

    this.resetBtnController = new ResetBtnController(
      this.trackpoolController,
      this.dashboardController,
    );

    this.dashboardController.updateBtnClickBind(() => {
      this.updateBtnController.updateCar();
    });

    this.dashboardController.generateBtnClickBind(() => {
      this.generateBtnController.generateCar();
    });

    this.dashboardController.raceBtnClickBind(() => {
      this.raceBtnController.startRace();
    });

    this.dashboardController.resetBtnClickBind(() => {
      this.resetBtnController.reset();
    });

    this.trackpoolController.updatePageBind(() => {
      this.dashboardController.enableRaceBtn();
      this.dashboardController.disableResetBtn();
    });

    this.trackpoolController.winBind(() => {
      this.dashboardController.enableResetBtn();
    });
  }

  show(): void {
    GarageView.clear();
    this.garageView.show();
    this.dashboardController.show();
    this.trackpoolController.show();
  }
}

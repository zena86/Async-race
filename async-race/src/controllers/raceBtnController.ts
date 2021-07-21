import DashboardController from './dashboard.controller';
import TrackpoolController from './trackpool.controller';

export default class RaceBtnController {
  private trackpoolController: TrackpoolController;

  private dashboardController: DashboardController;

  constructor(
    trackpoolController: TrackpoolController,
    dashboardController: DashboardController,
  ) {
    this.trackpoolController = trackpoolController;
    this.dashboardController = dashboardController;
  }

  startRace(): void {
    this.trackpoolController.startRace();
    this.dashboardController.disableRaceBtn();
  }
}

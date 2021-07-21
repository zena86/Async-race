import DashboardController from './dashboard.controller';
import TrackpoolController from './trackpool.controller';

export default class ResetBtnController {
  private trackpoolController: TrackpoolController;

  private dashboardController: DashboardController;

  constructor(
    trackpoolController: TrackpoolController,
    dashboardController: DashboardController,
  ) {
    this.trackpoolController = trackpoolController;
    this.dashboardController = dashboardController;
  }

  reset(): void {
    this.trackpoolController.reset();
    this.dashboardController.enableRaceBtn();
    this.dashboardController.disableResetBtn();
  }
}

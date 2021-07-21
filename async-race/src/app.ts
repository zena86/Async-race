import AlertController from './controllers/alert.controller';
import DashboardController from './controllers/dashboard.controller';
import GarageController from './controllers/garage.controller';
import NavigationController from './controllers/navigation.controller';
import ScoreController from './controllers/score.controller';
import RaceService from './services/race.service';
import WinnerService from './services/winner.service';
import Settings from './settings';
import AlertView from './views/alert.view';
import AppView from './views/app.view';
import DashboardView from './views/dashboard.view';
import GarageView from './views/garage.view';
import NavigationView from './views/navigation.view';
import ScoreView from './views/score.wiew';

class AppController {
  private appView: AppView;

  private serverUrl: string;

  constructor(appView: AppView) {
    this.appView = appView;
    const settings = new Settings();
    this.serverUrl = settings.serverUrl;
  }

  init(): void {
    const raceService = new RaceService(this.serverUrl);
    const winnerService = new WinnerService(this.serverUrl);
    const alertController = new AlertController(new AlertView());
    const navigationController = new NavigationController(new NavigationView());
    const scoreController = new ScoreController(
      new ScoreView(),
      winnerService,
      raceService,
      alertController,
    );
    const dashboardController = new DashboardController(
      new DashboardView(),
      raceService,
      alertController,
    );

    const garageController = new GarageController(
      new GarageView(),
      raceService,
      winnerService,
      alertController,
      dashboardController,
    );

    /* DEFAULT */
    garageController.show();
    navigationController.colorToGarageBtn();
    /* SHOW NAVIGATION */
    navigationController.toGarageBtnClickBind(() => {
      garageController.show();
      navigationController.colorToGarageBtn();
      dashboardController.enableRaceBtn();
      dashboardController.disableResetBtn();
    });
    navigationController.toWinnersBtnClickBind(() => {
      scoreController.show();
      navigationController.colorToWinnersBtn();
    });
  }
}
const app = new AppController(new AppView());
app.init();

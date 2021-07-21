import Car from '../models/car.model';
import Winner from '../models/winner.model';
import { Order, Sort } from '../services/constants';
import RaceService from '../services/race.service';
import WinnerService from '../services/winner.service';
import ScoreView from '../views/score.wiew';
import AlertController from './alert.controller';

export default class ScoreController {
  private scoreView: ScoreView;

  private winnerService: WinnerService;

  private raceService: RaceService;

  private alertController: AlertController;

  private page: number;

  private limit: number;

  private sort: string;

  private winsOrder: string;

  private timeOrder: string;

  constructor(
    scoreView: ScoreView,
    winnerService: WinnerService,
    raceService: RaceService,
    alertController: AlertController,
  ) {
    this.scoreView = scoreView;
    this.winnerService = winnerService;
    this.raceService = raceService;
    this.alertController = alertController;
    this.page = 1;
    this.limit = 10;
    this.sort = Sort.id;
    this.timeOrder = Order.desc;
    this.winsOrder = Order.asc;
    /* Pagination */
    this.scoreView.nextBtnClickBind(() => {
      if (this.limit * this.page < winnerService.totalWinnersAmount) {
        this.page += 1;
        if (this.sort === Sort.wins || this.sort === Sort.id) {
          this.showTablePage(this.page, this.sort, this.winsOrder);
        } else {
          this.showTablePage(this.page, this.sort, this.timeOrder);
        }
        this.scoreView.changeTablePageNum(this.page);
      }
      this.checkStatusBtn();
    });
    this.scoreView.prevBtnClickBind(() => {
      if (this.page > 1) {
        this.page -= 1;
        if (this.sort === Sort.wins || this.sort === Sort.id) {
          this.showTablePage(this.page, this.sort, this.winsOrder);
        } else {
          this.showTablePage(this.page, this.sort, this.timeOrder);
        }
        this.scoreView.changeTablePageNum(this.page);
      }
      this.checkStatusBtn();
    });
    /* Sort */
    this.scoreView.winsBtnClickBind(() => {
      this.scoreView.removeTimeArrows();
      this.sort = Sort.wins;
      if (this.winsOrder === Order.asc) {
        this.winsOrder = Order.desc;
        this.scoreView.setWinsArrowUp();
      } else {
        this.winsOrder = Order.asc;
        this.scoreView.setWinsArrowDown();
      }
      this.showTablePage(this.page, this.sort, this.winsOrder);
    });
    this.scoreView.timeBtnClickBind(() => {
      this.scoreView.removeWinsArrows();
      this.sort = Sort.time;
      if (this.timeOrder === Order.asc) {
        this.scoreView.setTimeArrowUp();
        this.timeOrder = Order.desc;
      } else {
        this.timeOrder = Order.asc;
        this.scoreView.setTimeArrowDown();
      }
      this.showTablePage(this.page, this.sort, this.timeOrder);
    });
    /* Change winners amount */
    this.winnerService.winnersAmountChangedBind((newWinnersAmount) => {
      this.checkStatusBtn();
      this.scoreView.setWinnersAmount(newWinnersAmount);
    });
  }

  show(): void {
    ScoreView.clear();
    this.scoreView.show();
    this.showTablePage(this.page, Sort.id, Order.asc);
  }

  /* SHOW TABLE PAGE */
  async showTablePage(
    page: number,
    sort: string,
    order: string,
  ): Promise<void> {
    this.scoreView.clearWinnersTable();
    try {
      const winnersOnPageArr = await this.winnerService.getWinners(
        page,
        this.limit,
        sort,
        order,
      );
      const carsResponses = winnersOnPageArr.map((winner) =>
        this.raceService.getCar(winner.id).catch(() => {}),
      );

      const cars = await Promise.all(carsResponses);
      let numCorrection = 1;
      winnersOnPageArr.map((winner: Winner, index: number) => {
        const car = cars.find(
          (curCar: Car) => curCar && curCar.id === winner.id,
        );
        if (car) {
          this.scoreView.drowRowTable(
            winner,
            car,
            (page - 1) * this.limit + index + numCorrection,
          );
        } else {
          numCorrection -= 1;
        }
        return car;
      });
    } catch (error) {
      this.alertController.show(`Error!: ${error}`);
    }
  }

  /* Pagination */
  checkStatusBtn(): void {
    const pageAmount = Math.ceil(
      this.winnerService.totalWinnersAmount / this.limit,
    );
    if (this.page > 1) {
      this.scoreView.enablePrevBtn();
    } else {
      this.scoreView.disablePrevBtn();
    }

    if (this.page + 1 > pageAmount) {
      this.scoreView.disableNextBtn();
    } else {
      this.scoreView.enableNextBtn();
    }
  }
}

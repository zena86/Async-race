import '../styles/score.scss';
import carImgHtml from '../assets/images/car.svg';
import BaseView from './base.view';
import Winner from '../models/winner.model';
import Car from '../models/car.model';

export default class ScoreView extends BaseView {
  private winnersEl: HTMLElement;

  private winnerAmountEl: HTMLElement;

  private pageNumEl: HTMLElement;

  private scoreEl: HTMLElement;

  private tbodyEl: HTMLElement;

  private numEl: HTMLElement;

  private carImgEl: SVGElement;

  private brandEl: HTMLElement;

  private prevBtnEl: HTMLButtonElement;

  private nextBtnEl: HTMLButtonElement;

  private winsAmount: HTMLElement;

  private bestTime: HTMLElement;

  private winsBtnEl: HTMLElement;

  private timeBtnEl: HTMLElement;

  private arrowUpImgEl: HTMLImageElement;

  constructor() {
    super();
    /* Winners titles */
    this.winnersEl = ScoreView.buildNode('div', 'winners', null);
    const titleEl = ScoreView.buildNode('h2', 'title', this.winnersEl);
    titleEl.innerHTML = 'Winners';
    this.winnerAmountEl = ScoreView.buildNode('span', null, titleEl);
    const subtitleEl = ScoreView.buildNode('h3', 'subtitle', this.winnersEl);
    subtitleEl.innerHTML = 'Page #';
    this.pageNumEl = ScoreView.buildNode('span', null, subtitleEl);
    this.pageNumEl.innerHTML = '1';
    /* Score Table */
    this.scoreEl = ScoreView.buildNode('main', 'main', this.winnersEl);
    const tableEl = ScoreView.buildNode('table', 'table', this.scoreEl);
    const theadEl = ScoreView.buildNode('thead', null, tableEl);
    const headerTrEl = ScoreView.buildNode('tr', null, theadEl);
    const th1El = ScoreView.buildNode('th', null, headerTrEl);
    th1El.innerHTML = '№';
    const th2El = ScoreView.buildNode('th', null, headerTrEl);
    th2El.innerHTML = 'Car';
    const th3El = ScoreView.buildNode('th', null, headerTrEl);
    th3El.innerHTML = 'Name';
    this.winsBtnEl = ScoreView.buildNode('th', null, headerTrEl);
    this.winsBtnEl.className = 'wins-btn';
    this.winsBtnEl.innerHTML = 'Wins';

    this.timeBtnEl = ScoreView.buildNode('th', null, headerTrEl);
    this.timeBtnEl.className = 'time-btn';
    this.timeBtnEl.innerHTML = 'Best time (seconds)';
    this.tbodyEl = ScoreView.buildNode('tbody', null, tableEl);
    /* Pagination */
    const paginationEl = ScoreView.buildNode(
      'div',
      'winners-pagination',
      this.scoreEl,
    );
    this.prevBtnEl = ScoreView.buildNode(
      'button',
      'btn_control',
      paginationEl,
    ) as HTMLButtonElement;
    this.prevBtnEl.innerHTML = 'prev';
    this.nextBtnEl = ScoreView.buildNode(
      'button',
      'btn_control',
      paginationEl,
    ) as HTMLButtonElement;
    this.nextBtnEl.innerHTML = 'next';
  }

  show(): void {
    const pageEl = document.querySelector('.page');
    pageEl.appendChild(this.winnersEl);
  }

  /* TITLES */
  setWinnersAmount(winnersAmount: number): void {
    this.winnerAmountEl.innerHTML = `(${winnersAmount})`;
  }

  changeTablePageNum(pageNum: number): void {
    this.pageNumEl.innerHTML = `${pageNum}`;
  }

  /* TABLE */
  clearWinnersTable(): void {
    this.tbodyEl.innerHTML = '';
  }

  drowRowTable(winner: Winner, car: Car, rowIndex: number): void {
    const rowTrEl = ScoreView.buildNode('tr', null, this.tbodyEl);
    this.numEl = ScoreView.buildNode('td', null, rowTrEl);
    this.numEl.innerHTML = `${rowIndex}`;
    const carTdEl = ScoreView.buildNode('td', 'car-td', rowTrEl);

    carTdEl.insertAdjacentHTML('beforeend', carImgHtml);
    this.carImgEl = carTdEl.lastChild as SVGElement;
    this.carImgEl.classList.add('car-img');
    this.carImgEl.style.fill = car.color;

    this.brandEl = ScoreView.buildNode('td', null, rowTrEl);
    this.brandEl.innerHTML = `${car.name}`;
    this.winsAmount = ScoreView.buildNode('td', null, rowTrEl);
    this.winsAmount.innerHTML = `${winner.wins}`;
    this.bestTime = ScoreView.buildNode('td', null, rowTrEl);
    this.bestTime.innerHTML = `${winner.time.toFixed(2)}`;
  }

  /* PAGINATION */
  prevBtnClickBind(callBack: () => void): void {
    this.prevBtnEl.addEventListener('click', () => callBack());
  }

  nextBtnClickBind(callBack: () => void): void {
    this.nextBtnEl.addEventListener('click', () => callBack());
  }

  disablePrevBtn(): void {
    this.prevBtnEl.classList.add('inactive-pagination');
  }

  disableNextBtn(): void {
    this.nextBtnEl.classList.add('inactive-pagination');
  }

  enablePrevBtn(): void {
    this.prevBtnEl.classList.remove('inactive-pagination');
  }

  enableNextBtn(): void {
    this.nextBtnEl.classList.remove('inactive-pagination');
  }

  /* SORTED */
  winsBtnClickBind(callBack: () => void): void {
    this.winsBtnEl.addEventListener('click', () => callBack());
  }

  timeBtnClickBind(callBack: () => void): void {
    this.timeBtnEl.addEventListener('click', () => callBack());
  }

  setWinsArrowUp(): void {
    this.winsBtnEl.classList.remove('arrow-down');
    this.winsBtnEl.classList.add('arrow-up');
  }

  setWinsArrowDown(): void {
    this.winsBtnEl.classList.remove('arrow-up');
    this.winsBtnEl.classList.add('arrow-down');
  }

  setTimeArrowUp(): void {
    this.timeBtnEl.classList.remove('arrow-down');
    this.timeBtnEl.classList.add('arrow-up');
  }

  setTimeArrowDown(): void {
    this.timeBtnEl.classList.remove('arrow-up');
    this.timeBtnEl.classList.add('arrow-down');
  }

  removeWinsArrows(): void {
    this.winsBtnEl.classList.remove('arrow-down');
    this.winsBtnEl.classList.remove('arrow-up');
  }

  removeTimeArrows(): void {
    this.timeBtnEl.classList.remove('arrow-down');
    this.timeBtnEl.classList.remove('arrow-up');
  }
}

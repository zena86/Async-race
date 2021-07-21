import '../styles/pagination.scss';
import BaseView from './base.view';

export default class TrackpoolView extends BaseView {
  private tracksEl: HTMLElement;

  private carsAmountEl: HTMLElement;

  private pageNumEl: HTMLElement;

  private prevBtnEl: HTMLButtonElement;

  private nextBtnEl: HTMLButtonElement;

  private raceRowsEl: HTMLElement;

  constructor() {
    super();
    this.tracksEl = TrackpoolView.buildNode('main', 'tracks', null);
    /* Title */
    const titleEl = TrackpoolView.buildNode('h2', 'title', this.tracksEl);
    titleEl.innerHTML = 'Garage';
    this.carsAmountEl = TrackpoolView.buildNode('span', null, titleEl);
    this.carsAmountEl.innerHTML = '(0)';
    const subtitleEl = TrackpoolView.buildNode('h3', 'subtitle', this.tracksEl);
    subtitleEl.innerHTML = 'Page #';
    this.pageNumEl = TrackpoolView.buildNode('span', null, subtitleEl);
    this.pageNumEl.innerHTML = '1';
    /* Race rows */
    this.raceRowsEl = TrackpoolView.buildNode(
      'div',
      'race-rows',
      this.tracksEl,
    );
    /* Pagination */
    const paginationEl = TrackpoolView.buildNode(
      'div',
      'garage-pagination',
      this.tracksEl,
    );
    this.prevBtnEl = TrackpoolView.buildNode(
      'button',
      'btn_control',
      paginationEl,
    ) as HTMLButtonElement;
    this.prevBtnEl.innerHTML = 'prev';
    this.nextBtnEl = TrackpoolView.buildNode(
      'button',
      'btn_control',
      paginationEl,
    ) as HTMLButtonElement;
    this.nextBtnEl.innerHTML = 'next';
  }

  clear(): void {
    this.raceRowsEl.innerHTML = '';
  }

  show(): void {
    const garageEl = document.querySelector('.garage');
    garageEl.appendChild(this.tracksEl);
  }

  /* TITLES */
  setCarsAmount(carsAmount: number): void {
    this.carsAmountEl.innerHTML = `(${carsAmount})`;
  }

  doOnPaginationBtnClick(page: number): void {
    this.pageNumEl.innerHTML = `${page}`;
  }

  /* BTN BIND */
  prevBtnClickBind(callBack: () => void): void {
    this.prevBtnEl.addEventListener('click', () => callBack());
  }

  nextBtnClickBind(callback: () => void): void {
    this.nextBtnEl.addEventListener('click', () => callback());
  }

  /* PAGINATION */
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
}

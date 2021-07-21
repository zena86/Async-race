import '../styles/track.scss';
import carImgHtml from '../assets/images/car.svg';
import flagImgSrc from '../assets/images/flag.svg';
import BaseView from './base.view';
import Car from '../models/car.model';

export default class TrackView extends BaseView {
  private trackEl: HTMLElement;

  private selectBtnEl: HTMLButtonElement;

  private removeBtnEl: HTMLButtonElement;

  private aBtnEl: HTMLButtonElement;

  private bBtnEl: HTMLButtonElement;

  private carNameEl: HTMLElement;

  private carImgEl: SVGElement;

  public car: Car;

  public winMessage: HTMLElement;

  constructor(car: Car) {
    super();
    this.car = car;
    this.trackEl = TrackView.buildNode('div', 'tracks-item', null);
    /* Row 1 */
    const trackRow1 = TrackView.buildNode('div', 'track-row', this.trackEl);
    this.selectBtnEl = TrackView.buildNode(
      'button',
      'btn_sm',
      trackRow1,
    ) as HTMLButtonElement;
    this.selectBtnEl.innerHTML = 'select';
    this.removeBtnEl = TrackView.buildNode(
      'button',
      'btn_sm',
      trackRow1,
    ) as HTMLButtonElement;
    this.removeBtnEl.innerHTML = 'remove';
    this.carNameEl = TrackView.buildNode('p', 'car-name', trackRow1);
    this.carNameEl.innerHTML = this.car.name;
    /* Row 2 */
    const trackRow2 = TrackView.buildNode('div', 'track-row', this.trackEl);
    const abBtnsEl = TrackView.buildNode('div', 'btns_ab', trackRow2);
    this.aBtnEl = TrackView.buildNode(
      'div',
      'btn_ab',
      abBtnsEl,
    ) as HTMLButtonElement;
    this.aBtnEl.innerHTML = 'A';
    this.bBtnEl = TrackView.buildNode(
      'div',
      'btn_ab ab-disabled',
      abBtnsEl,
    ) as HTMLButtonElement;
    this.bBtnEl.innerHTML = 'B';
    const wayEl = TrackView.buildNode('div', 'way', trackRow2);

    wayEl.insertAdjacentHTML('beforeend', carImgHtml);
    this.carImgEl = wayEl.lastChild as SVGElement;
    this.carImgEl.classList.add('car-track');
    this.carImgEl.style.fill = this.car.color;

    TrackView.buildNode('p', 'path', this.trackEl);

    wayEl.insertAdjacentHTML('beforeend', flagImgSrc);
    (wayEl.lastChild as SVGElement).classList.add('flag');

    this.winMessage = TrackView.buildNode('p', 'message', this.trackEl);
  }

  show(): void {
    const tracksEl = document.querySelector('.race-rows');
    tracksEl.appendChild(this.trackEl);
  }

  clear(): void {
    this.trackEl.innerHTML = '';
  }

  /* BTN BIND */
  removeBtnClickBind(callBack: () => void): void {
    this.removeBtnEl.addEventListener('click', () => callBack());
  }

  selectBtnClickBind(callBack: () => void): void {
    this.selectBtnEl.addEventListener('click', () => callBack());
  }

  aBtnClickBind(callBack: () => void): void {
    this.aBtnEl.addEventListener('click', () => callBack());
  }

  bBtnClickBind(callBack: () => void): void {
    this.bBtnEl.addEventListener('click', () => callBack());
  }

  /* DRIVE CAR */
  drawDriveCar(realDurationMs: number, expectedDurationMs: number): void {
    const position = Math.min(realDurationMs / expectedDurationMs, 1);
    this.carImgEl.style.left = `${position * 94}%`;
  }

  resetCar(): void {
    this.carImgEl.style.left = '0';
  }

  drowWinMessage(winMessage: string): void {
    this.winMessage.innerHTML = winMessage;
  }

  hideWinMessage(): void {
    this.winMessage.innerHTML = '';
  }

  /* Button A, B */
  disableABtn(): void {
    this.aBtnEl.classList.add('ab-disabled');
  }

  disableBBtn(): void {
    this.bBtnEl.classList.add('ab-disabled');
  }

  enableABtn(): void {
    this.aBtnEl.classList.remove('ab-disabled');
  }

  enableBBtn(): void {
    this.bBtnEl.classList.remove('ab-disabled');
  }
}

import Car from '../models/car.model';
import Winner from '../models/winner.model';
import { ErrorCode } from './constants';
import ServerError from './error';

export default class WinnerService {
  private serverUrl: string;

  private winnersAmount: number;

  private winnersAmountChangedCallBackList: ((
    newWinnersAmount: number,
  ) => void)[];

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
    this.winnersAmountChangedCallBackList = [];
  }

  /* TOTAL WINNERS AMOUNT */
  get totalWinnersAmount(): number {
    return this.winnersAmount;
  }

  winnersAmountChangedBind(callBack: (newWinnersAmount: number) => void): void {
    this.winnersAmountChangedCallBackList.push(callBack);
  }

  private updateWinnersAmount(newWinnersAmount: number) {
    if (this.winnersAmount !== newWinnersAmount) {
      this.winnersAmount = newWinnersAmount;
      this.winnersAmountChangedCallBackList.forEach((callBack) =>
        callBack(this.winnersAmount),
      );
    }
  }

  /* CRUD */
  async getWinners(
    page: number,
    limit: number,
    sort: string,
    order: string,
  ): Promise<Winner[]> {
    const url = `${this.serverUrl}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    const response = await fetch(url, { method: 'GET', cache: 'no-cache' });
    if (response.status === 200) {
      this.updateWinnersAmount(+response.headers.get('X-Total-Count'));
      return (await response.json()) as Promise<Winner[]>;
    }
    throw new ServerError('Error during get winners ', ErrorCode.unknown);
  }

  async getWinner(id: number): Promise<Winner> {
    const url = `${this.serverUrl}/winners/${id}`;
    const response = await fetch(url, { method: 'GET', cache: 'no-cache' });
    if (response.status === 200) {
      return (await response.json()) as Promise<Winner>;
    }
    if (response.status === 404) {
      throw new ServerError('Get Winner Error ', ErrorCode.notFound);
    } else {
      throw new ServerError('Error during get winner ', ErrorCode.unknown);
    }
  }

  async createWinner(car: Car): Promise<Winner> {
    const url = `${this.serverUrl}/winners`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ id: car.id, wins: 1, time: car.timeSec }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 201) {
      this.updateWinnersAmount(this.winnersAmount + 1);
      return (await response.json()) as Promise<Winner>;
    }
    if (response.status === 500) {
      throw new ServerError(
        'Error: Insert failed, duplicate id ',
        ErrorCode.internalServerError,
      );
    } else {
      throw new ServerError('Error during create winner ', ErrorCode.unknown);
    }
  }

  async updateWinner(winner: Winner): Promise<void> {
    const url = `${this.serverUrl}/winners/${winner.id}`;
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(winner),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      return (await response.json()) as Promise<void>;
    }
    if (response.status === 404) {
      throw new ServerError('Update Winner Error ', ErrorCode.notFound);
    } else {
      throw new ServerError('Error during update winner ', ErrorCode.unknown);
    }
  }

  async deleteWinner(id: number): Promise<void> {
    const url = `${this.serverUrl}/winners/${id}`;
    const response = await fetch(url, { method: 'DELETE' });
    if (response.status === 200) {
      return;
    }
    if (response.status === 404) {
      throw new ServerError('Delete Winner Error ', ErrorCode.notFound);
    } else {
      throw new ServerError('Error during delete winner ', ErrorCode.unknown);
    }
  }
}

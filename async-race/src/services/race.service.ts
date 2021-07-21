import Car from '../models/car.model';
import ErrorHandler from './errorHandler.service';
import { ErrorCode } from './constants';
import ServerError from './error';

export default class RaceService {
  private serverUrl: string;

  private carsAmount: number;

  private carsAmountChangedCallBackList: ((newCarsAmount: number) => void)[];

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
    this.carsAmountChangedCallBackList = [];
  }

  get totalCarsAmount(): number {
    return this.carsAmount;
  }

  carsAmountChangedBind(callBack: (newCarsAmount: number) => void): void {
    this.carsAmountChangedCallBackList.push(callBack);
  }

  /* CHANGE CARS AMOUNT */
  private updateCarsAmount(newCarsAmount: number) {
    if (this.carsAmount !== newCarsAmount) {
      this.carsAmount = newCarsAmount;
      this.carsAmountChangedCallBackList.forEach((callBack) =>
        callBack(this.carsAmount),
      );
    }
  }

  /* CREATE */
  async createCars(cars: Car[]): Promise<void> {
    const url = `${this.serverUrl}/garage`;
    let carsCreatedNumber = 0;

    const counterFunc = (response: Response) => {
      if (response.status === 201) {
        carsCreatedNumber += 1;
      }
    };

    const requests = [];
    for (let i = 0; i < cars.length; i += 1) {
      const car = cars[i];
      const request = fetch(url, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({ id: car.id, color: car.color, name: car.name }),
        headers: { 'Content-Type': 'application/json' },
      }).then(counterFunc);
      requests.push(request);
    }

    await Promise.all(requests);

    if (carsCreatedNumber < cars.length)
      throw new ServerError('Unable to create car(s) ', ErrorCode.unknown);

    this.updateCarsAmount(this.carsAmount + carsCreatedNumber);
  }

  /* READ */
  async getCarsOnPage(page: number, limit: number): Promise<Car[]> {
    const url = `${this.serverUrl}/garage?_page=${page}&_limit=${limit}`;
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
    });
    if (response.status === 200) {
      this.updateCarsAmount(+response.headers.get('X-Total-Count'));
      return (await response.json()) as Promise<Car[]>;
    }
    ErrorHandler.init(response, 'Get cars on page').handleUnknown();
    return undefined;
  }

  async getCar(id: number): Promise<Car> {
    const url = `${this.serverUrl}/garage/${id}`;
    const response = await fetch(url, { method: 'GET', cache: 'no-store' });
    if (response.status === 200) {
      return (await response.json()) as Promise<Car>;
    }
    ErrorHandler.init(response, 'Get car').handle404().handleUnknown();
    return undefined;
  }

  /* UPDATE */
  async updateCar(car: Car): Promise<Car> {
    const url = `${this.serverUrl}/garage/${car.id}`;
    const response = await fetch(url, {
      method: 'PUT',
      cache: 'no-store',
      body: JSON.stringify({ id: car.id, color: car.color, name: car.name }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      return (await response.json()) as Promise<Car>;
    }
    ErrorHandler.init(response, 'Update car').handle404().handleUnknown();
    return undefined;
  }

  /* DELETE */
  async deleteCar(id: number): Promise<void> {
    const url = `${this.serverUrl}/garage/${id}`;
    const response = await fetch(url, { method: 'DELETE', cache: 'no-store' });
    if (response.status === 200) {
      this.updateCarsAmount(this.carsAmount - 1);
      return;
    }
    ErrorHandler.init(response, 'Delete car').handle404().handleUnknown();
  }

  /* Start / Stop Car's Engine */
  async startStopEngine(
    id: number,
    status: string,
  ): Promise<Record<string, unknown>> {
    const url = `${this.serverUrl}/engine?id=${id}&status=${status}`;
    const response = await fetch(url, { method: 'GET', cache: 'no-store' });
    if (response.status === 200)
      return (await response.json()) as Promise<Record<string, unknown>>;
    ErrorHandler.init(response, 'Start/stop engine')
      .handle400()
      .handle404()
      .handleUnknown();
    return undefined;
  }

  /* Switch Engine to Drive Mode */
  async switchEngineToDrive(
    id: number,
    status: string,
  ): Promise<Record<string, unknown>> {
    const url = `${this.serverUrl}/engine?id=${id}&status=${status}`;
    const response = await fetch(url, { method: 'GET', cache: 'no-store' });
    if (response.status === 200)
      return (await response.json()) as Promise<Record<string, unknown>>;
    ErrorHandler.init(response, 'Switch engine to drive')
      .handle400()
      .handle404()
      .handle429()
      .handle500()
      .handleUnknown();
    return undefined;
  }
}

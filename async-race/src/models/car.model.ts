export default class Car {
  public name: string;

  public color: string;

  public id: number;

  public timeSec: number;

  public isStopped: boolean;

  public isDriving: boolean;

  public wins: number;

  constructor() {
    this.isStopped = false;
    this.isDriving = false;
  }
}

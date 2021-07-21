import AlertView from '../views/alert.view';

export default class AlertController {
  private alertView: AlertView;

  constructor(alertView: AlertView) {
    this.alertView = alertView;

    this.alertView.okBtnElBind(() => {
      this.alertView.hide();
    });
  }

  show(text: string): void {
    this.alertView.show(text);
  }
}

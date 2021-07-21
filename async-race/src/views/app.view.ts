import '../styles/app.scss';
import BaseView from './base.view';

export default class AppView extends BaseView {
  constructor() {
    super();
    const rootEl = document.querySelector('#root');
    AppView.buildNode('div', 'navigation', rootEl);
    AppView.buildNode('div', 'page', rootEl);
  }
}

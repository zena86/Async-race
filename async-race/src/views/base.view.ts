export default class BaseView {
  static clear(): void {
    const pageEl = document.querySelector('.page');
    pageEl.innerHTML = '';
  }

  static buildNode(
    tag: string,
    className: string,
    parent: Element,
    options?: Record<string, string>,
  ): HTMLElement {
    const node = document.createElement(tag);
    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        node.setAttribute(key, value);
      });
    }
    if (className) node.className = className;
    parent?.appendChild(node);
    return node;
  }
}

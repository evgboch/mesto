export class Section {
  constructor({renderer}, containerSelector) {
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderSection(items) {
    items.reverse().forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}

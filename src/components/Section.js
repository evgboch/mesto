export class Section {
  constructor({renderer}, containerSelector) {
    // this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderSection(items) {
    // this._items.forEach((item) => {
    //   this.renderer(item);
    // });
    items.forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(cardElement) {
    this._container.append(cardElement);
  }
}

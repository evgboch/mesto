export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._escBinder = this._handleEscClose.bind(this);
  }

  _closeOpenedPopup() {
    const popupOpened = document.querySelector(".popup_opened");
    this.close(popupOpened);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._closeOpenedPopup();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._escBinder);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escBinder);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close()
      }
      if (evt.target.classList.contains("popup__close-button")) {
        this.close()
      }
  });
  }
}

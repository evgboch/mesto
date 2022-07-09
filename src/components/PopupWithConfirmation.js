import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmationButton = document.querySelector(".popup__submit-button_confirmation");
    this._cardForDelete = null;
  }

  open(evt) {
    this._cardForDelete = evt.target.closest(".photo-cards__element");
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener("click", () => {
      this._cardForDelete.remove();
      this.close();
    });
  }
}

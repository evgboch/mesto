import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmationButton = document.querySelector(".popup__submit-button_confirmation");
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener("click", () => {
      this._handleSubmitCallback(this);
    });
  }
}

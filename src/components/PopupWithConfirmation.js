import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleDeleteConfirmation}) {
    super(popupSelector);
    this._handleDeleteConfirmation = handleDeleteConfirmation;
    this._confirmationButton = document.querySelector(".popup__submit-button_confirmation");
    this._cardForDelete = null;
    this._idForDelete = null;
  }

  open(evt, cardId) {
    this._idForDelete = cardId;
    this._cardForDelete = evt.target.closest(".photo-cards__element");
    super.open();
  }



  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener("click",

    () => {
      // debugger
      this._handleDeleteConfirmation(this._idForDelete);
      this._cardForDelete.remove();
      this.close();
    }

    );
  }
}

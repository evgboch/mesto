import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmition}) {
    super(popupSelector);
    this._handleFormSubmition = handleFormSubmition;
    this._form = this._popup.querySelector(".popup__container");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._submitBinder = this._handleSubmition.bind(this);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    if (this._popup.classList.contains("popup_card")) {
      this._formValues.alt = this._formValues.name;
    }

    return this._formValues;
  }

  _handleSubmition(evt) {
    evt.preventDefault();
    this._handleFormSubmition(this._getInputValues());
  }

   formSending(isSending) {
    if(isSending) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = "Сохранить";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitBinder);
  }

  open(userInfo) {
    this._inputList.forEach((input) => {
      input.value = userInfo[input.getAttribute("id")];
    });
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}

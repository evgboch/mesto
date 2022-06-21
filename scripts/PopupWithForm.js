import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmition) {
    super(popupSelector);
    this._handleFormSubmition = handleFormSubmition;
    this._form = this._popup.querySelector(".popup__container");
    this._topInput = this._form.querySelector(".popup__input_place_top");
    this._bottomInput = this._form.querySelector(".popup__input_place_bottom");
  }

  _getInputValues() {
    const value1 = this._topInput.value;
    const value2 = this._bottomInput.value;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._handleFormSubmition);
  }

  close() {
    super.close();
    this._form.reset();
  }
}

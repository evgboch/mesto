export class FormValidator {
  constructor(validationParams, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = validationParams.inputSelector;
    this._submitButtonSelector = validationParams.submitButtonSelector;
    this._inactiveButtonClass = validationParams.inactiveButtonClass;
    this._inputErrorClass = validationParams.inputErrorClass;
    this._errorClass = validationParams.errorClass;
  }

  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners(formElement, inputList, submitButton) {
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleSubmitButtonState(inputList, submitButton);
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleSubmitButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.setAttribute("disabled", "");
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.removeAttribute("disabled", "");
    }
  }

  resetValidation() {
    const formElement = document.querySelector(this._formSelector);
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const submitButton = formElement.querySelector(this._submitButtonSelector);

    this._toggleSubmitButtonState(inputList, submitButton);
    inputList.forEach((inputElement) => {
      this._hideInputError(formElement, inputElement);
    });
  }

  enableValidation() {
    const formElement = document.querySelector(this._formSelector);
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const submitButton = formElement.querySelector(this._submitButtonSelector);

    this._toggleSubmitButtonState(inputList, submitButton);
    this._setEventListeners(formElement, inputList, submitButton);
  }
}

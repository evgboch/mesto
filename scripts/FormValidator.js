class FormValidator {
  constructor(validationParams) {
    this._formSelector = validationParams.formSelector;
    this._inputSelector = validationParams.inputSelector;
    this._submitButtonSelector = validationParams.submitButtonSelector;
    this._inactiveButtonClass = validationParams.inactiveButtonClass;
    this._inputErrorClass = validationParams.inputErrorClass;
    this._errorClass = validationParams.errorClass;
  }

  showInputError(formElement, inputElement, validationObject) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationObject.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(validationObject.errorClass);
  }

  hideInputError(formElement, inputElement, validationObject) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationObject.inputErrorClass);
    errorElement.classList.remove(validationObject.errorClass);
    errorElement.textContent = "";
  }

  checkInputValidity(formElement, inputElement, validationObject) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, validationObject);
    } else {
      hideInputError(formElement, inputElement, validationObject);
    }
  }

  setEventListeners(formElement, inputList, validationObject, submitButton) {
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, validationObject);
        toggleSubmitButtonState(inputList, submitButton, validationObject);
      });
    });
  }

  hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  toggleSubmitButtonState(inputList, submitButton, validationObject) {
    if (hasInvalidInput(inputList)) {
      submitButton.classList.add(validationObject.inactiveButtonClass);
      submitButton.setAttribute("disabled", "");
    } else {
      submitButton.classList.remove(validationObject.inactiveButtonClass);
      submitButton.removeAttribute("disabled", "");
    }
  }

  enableValidation(validationObject) {
    const formList = Array.from(document.querySelectorAll(validationObject.formSelector));

    formList.forEach((formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
      const submitButton = formElement.querySelector(validationObject.submitButtonSelector);
      toggleSubmitButtonState(inputList, submitButton, validationObject);
      setEventListeners(formElement, inputList, validationObject, submitButton);
    });
  }
}

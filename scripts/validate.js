// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function showInputError(formElement, inputElement, validationObject) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationObject.inputErrorClass);

}

function hideInputError(formElement, inputElement, validationObject) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationObject.inputErrorClass);
}

function checkInputValidity (formElement, inputElement, validationObject) {
  // console.log(formElement);
  // console.log(inputElement);

  if (!inputElement.validity.valid) {
    // console.log(formElement);
    // console.log(inputElement);
    showInputError(formElement, inputElement, validationObject);
  } else {
    hideInputError(formElement, inputElement, validationObject);
  }
}

function enableValidation (validationObject) {
  const formList = Array.from(document.querySelectorAll(validationObject.formSelector));

  formList.forEach((formElement) => {
    // console.log(formElement);
    const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
    inputList.forEach((inputElement) => {
      // console.log(inputElement);
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, validationObject);
      });
    });
  });
}

import '../pages/index.css'; // добавили импорт главного файла стилей
import { initialCards } from "../utils/cardsData.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const cardAddButton = profile.querySelector(".profile__add-button");

const validationData = {
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const formValidators = {};

function enableValidation(validationParams) {
  const formList = Array.from(document.querySelectorAll(validationParams.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(validationParams, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

function handleCardClick(link, name) {
  const imagePopupInstance = new PopupWithImage(".popup_photo");
  imagePopupInstance.open(link, name);
  imagePopupInstance.setEventListeners();
}

function createCard(cardData) {
  const cardsInstance = new Card(cardData, ".photo-cards-template", handleCardClick);
  return cardsInstance.generatePhotoCard();
}

function openProfilePopup() {
  const userInfo = userInfoInstance.getUserInfo();
  formPopupInstance.open(userInfo);
  formPopupInstance.setEventListeners();
  formValidators["popupProfileForm"].resetValidation();
}

function openCardPopup() {
  const clearValues = {
    place: "",
    link: ""
  }
  cardPopupInstance.open(clearValues);
  cardPopupInstance.setEventListeners();
  formValidators["popupCardForm"].resetValidation();
}

const sectionInstance = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardsElement = createCard(item);
    sectionInstance.addItem(cardsElement);
}}, ".photo-cards__grid");

const userInfoInstance = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileSubtitleSelector: ".profile__subtitle"
});

const formPopupInstance = new PopupWithForm({
  popupSelector: ".popup_profile",
  handleFormSubmition: (formData) => {
    userInfoInstance.setUserInfo({
      name: formData.nameField,
      description: formData.descriptionField
    });
    formPopupInstance.close();
  }
});

const cardPopupInstance = new PopupWithForm({
  popupSelector: ".popup_card",
  handleFormSubmition: (item) => {
    sectionInstance.renderer(item);
    cardPopupInstance.close();
  }
});

sectionInstance.renderSection();

profileEditButton.addEventListener("click", openProfilePopup);
cardAddButton.addEventListener("click", openCardPopup);

enableValidation(validationData);

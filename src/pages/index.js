import '../pages/index.css'; // добавили импорт главного файла стилей
import { validationData } from "../utils/constants.js"
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

function handleCardClick(link, name, alt) {
  imagePopupInstance.open(link, name, alt);
}

function createCard(cardData) {
  const cardsInstance = new Card(cardData, ".photo-cards-template", handleCardClick);
  return cardsInstance.generatePhotoCard();
}

function openProfilePopup() {
  const userInfo = userInfoInstance.getUserInfo();
  formPopupInstance.open(userInfo);
  formValidators["popupProfileForm"].resetValidation();
}

function openCardPopup() {
  const clearValues = {
    place: "",
    link: ""
  }
  cardPopupInstance.open(clearValues);
  formValidators["popupCardForm"].resetValidation();
}

const imagePopupInstance = new PopupWithImage(".popup_photo");

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
imagePopupInstance.setEventListeners();
cardPopupInstance.setEventListeners();
formPopupInstance.setEventListeners();

profileEditButton.addEventListener("click", openProfilePopup);
cardAddButton.addEventListener("click", openCardPopup);

enableValidation(validationData);

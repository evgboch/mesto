import { initialCards } from "./cardsData.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
// import { openPopup, closePopup } from "./utils.js";

const profilePopup = document.querySelector(".popup_profile");
const profileFormElement = profilePopup.querySelector(".popup__container_profile");
const profileTopInput = profileFormElement.querySelector(".popup__input[name = nameField]");
const profileBottomInput = profileFormElement.querySelector(".popup__input[name = descriptionField]");

const cardPopup = document.querySelector(".popup_card");
const cardFormElement = cardPopup.querySelector(".popup__container_card");
const cardTopInput = cardFormElement.querySelector(".popup__input[name = cardNameField]");
const cardBottomInput = cardFormElement.querySelector(".popup__input[name = linkField]");

// const popupList = document.querySelectorAll('.popup');

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const profileEditButton = profile.querySelector(".profile__edit-button");
const cardAddButton = profile.querySelector(".profile__add-button");

// const photoPopup = document.querySelector(".popup_photo");
// const photoPopupImage = photoPopup.querySelector(".popup__image");
// const photoPopupCaption = photoPopup.querySelector(".popup__image-caption");

// const photoCardsContainer = document.querySelector(".photo-cards__grid");

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

// function handlePictureClick(link, name, alt) {
//   photoPopupImage.setAttribute("src", link);
//   photoPopupImage.setAttribute("alt", alt);
//   photoPopupCaption.textContent = name;

//   openPopup(photoPopup);
// }

// function openProfilePopup() {
//   profileTopInput.value = profileTitle.textContent;
//   profileBottomInput.value = profileSubtitle.textContent;

//   formValidators["popupProfileForm"].resetValidation();
//   openPopup(profilePopup);
// }

// function openCardPopup() {
//   // cardFormElement.reset();

//   formValidators["popupCardForm"].resetValidation();
//   openPopup(cardPopup);
// }

// function handleProfileFormSubmition(evt) {
//   evt.preventDefault();

//   profileTitle.textContent = profileTopInput.value;
//   profileSubtitle.textContent = profileBottomInput.value;

//   closePopup(profilePopup);
// }

// function handleCardFormSubmition(evt) {
//   evt.preventDefault();

//   renderPhotoCard({ name: cardTopInput.value, link: cardBottomInput.value });

//   closePopup(cardPopup);
// }

// function createCard(cardData) {
//   const cardsInstance = new Card(cardData, ".photo-cards-template", handlePictureClick);
//   return cardsInstance.generatePhotoCard();
// }

function handleCardClick(link, name) {
  const imagePopupInstance = new PopupWithImage(".popup_photo");
  imagePopupInstance.open(link, name);
  imagePopupInstance.setEventListeners();
}

function createCard(cardData) {
  const cardsInstance = new Card(cardData, ".photo-cards-template", handleCardClick);
  return cardsInstance.generatePhotoCard();
}

// function renderPhotoCard(cardData) {
//   const cardsElement = createCard(cardData);
//   photoCardsContainer.prepend(cardsElement);
// }

const sectionInstance = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardsElement = createCard(item);
    sectionInstance.addItem(cardsElement);
}}, ".photo-cards__grid");

sectionInstance.renderSection();

// initialCards.forEach(renderPhotoCard);

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

function openProfilePopup() {
  const userInfo = userInfoInstance.getUserInfo();
  // const formPopupInstance = new PopupWithForm({
  //   popupSelector: ".popup_profile",
  //   handleFormSubmition: (formData) => {
  //     userInfoInstance.setUserInfo({
  //       name: formData.nameField,
  //       description: formData.descriptionField
  //     });
  //     formPopupInstance.close();
  //   }
  // });

  formPopupInstance.open(userInfo);
  formPopupInstance.setEventListeners();

  formValidators["popupProfileForm"].resetValidation();
}

const cardPopupInstance = new PopupWithForm({
  popupSelector: ".popup_card",
  handleFormSubmition: (item) => {
    sectionInstance.renderer(item);
    cardPopupInstance.close();
  }
});

function openCardPopup() {
  const clearValues = {
    name: "",
    link: ""
  }
  // const cardPopupInstance = new PopupWithForm({
  //   popupSelector: ".popup_card",
  //   handleFormSubmition: (item) => {
  //     sectionInstance.renderer(item);
  //     cardPopupInstance.close();
  //   }
  // });
  cardPopupInstance.open(clearValues);
  cardPopupInstance.setEventListeners();

  // cardFormElement.reset();

  formValidators["popupCardForm"].resetValidation();
  // openPopup(cardPopup);
}

profileEditButton.addEventListener("click", openProfilePopup);
cardAddButton.addEventListener("click", openCardPopup);
// profileFormElement.addEventListener('submit', handleProfileFormSubmition);
// cardFormElement.addEventListener('submit', handleCardFormSubmition);

// popupList.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//       if (evt.target.classList.contains("popup_opened")) {
//         closePopup(popup)
//       }
//       if (evt.target.classList.contains("popup__close-button")) {
//         closePopup(popup)
//       }
//   });
// });

enableValidation(validationData);

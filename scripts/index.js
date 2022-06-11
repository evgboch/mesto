import { initialCards } from "./cardsData.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

const profilePopup = document.querySelector(".popup_profile");
const profileFormElement = profilePopup.querySelector(".popup__container_profile");
const profileTopInput = profileFormElement.querySelector(".popup__input[name = nameField]");
const profileBottomInput = profileFormElement.querySelector(".popup__input[name = descriptionField]");

const cardPopup = document.querySelector(".popup_card");
const cardFormElement = cardPopup.querySelector(".popup__container_card");
const cardTopInput = cardFormElement.querySelector(".popup__input[name = cardNameField]");
const cardBottomInput = cardFormElement.querySelector(".popup__input[name = linkField]");

const popupList = document.querySelectorAll('.popup')

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const profileEditButton = profile.querySelector(".profile__edit-button");
const cardAddButton = profile.querySelector(".profile__add-button");

const photoCardsContainer = document.querySelector(".photo-cards__grid");

const validationData = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const profileFormValidator = new FormValidator(validationData, ".popup__container_profile");
const cardFormValidator = new FormValidator(validationData, ".popup__container_card");

function openProfilePopup() {
  profileTopInput.value = profileTitle.textContent;
  profileBottomInput.value = profileSubtitle.textContent;

  profileFormValidator.resetValidation();
  openPopup(profilePopup);
}

function openCardPopup() {
  cardFormElement.reset();

  cardFormValidator.resetValidation();
  openPopup(cardPopup);
}

function handleProfileFormSubmition(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileTopInput.value;
  profileSubtitle.textContent = profileBottomInput.value;

  closePopup(profilePopup);
}

function handleCardFormSubmition(evt) {
  evt.preventDefault();

  renderPhotoCard({ name: cardTopInput.value, link: cardBottomInput.value, alt: cardTopInput.value });

  closePopup(cardPopup);
}

function renderPhotoCard(cardsData) {
  const cardsElement = new Card(cardsData, ".photo-cards-template");
  photoCardsContainer.prepend(cardsElement.generatePhotoCard());
}

initialCards.forEach((cardsData) => {
  renderPhotoCard(cardsData);
});

profileEditButton.addEventListener("click", openProfilePopup);
cardAddButton.addEventListener("click", openCardPopup);
profileFormElement.addEventListener('submit', handleProfileFormSubmition);
cardFormElement.addEventListener('submit', handleCardFormSubmition);

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  });
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

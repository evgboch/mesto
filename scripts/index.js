const profilePopup = document.querySelector(".popup_profile");
const profileFormElement = profilePopup.querySelector(".popup__container_profile");
const profileTopInput = profileFormElement.querySelector(".popup__input[name = nameField]");
const profileBottomInput = profileFormElement.querySelector(".popup__input[name = descriptionField]");
const profilePopupTitle = profileFormElement.querySelector(".popup__title_profile");

const cardPopup = document.querySelector(".popup_card");
const cardFormElement = cardPopup.querySelector(".popup__container_card");
const cardTopInput = cardFormElement.querySelector(".popup__input[name = cardNameField]");
const cardBottomInput = cardFormElement.querySelector(".popup__input[name = linkField]");
const cardPopupTitle = cardFormElement.querySelector(".popup__title_card");

const photoPopup = document.querySelector(".popup_photo");

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const profileEditButton = profile.querySelector(".profile__edit-button");
const cardAddButton = profile.querySelector(".profile__add-button");

const photoCardsContainer = document.querySelector(".photo-cards__grid");
const photoCardsTemplate = document.querySelector(".photo-cards-template").content.querySelector(".photo-cards__element");

function popupCloseHandler() {
  const popupOpened = document.querySelector(".popup_opened");
  if (popupOpened.classList.contains("popup_card")) {
    const inputList = Array.from(popupOpened.querySelectorAll(".popup__input"));
    inputList.forEach((inputElement) => {
      hideInputError(cardFormElement, inputElement, {inputErrorClass: 'popup__input_type_error', errorClass: 'popup__error_visible'});
    });
  }
  closePopup(popupOpened);
}

function addCloseButtonListener(popup) {
  const popupCloseButton = popup.querySelector(".popup__close-button");
  popupCloseButton.addEventListener("click", popupCloseHandler);
}

function removeCloseButtonListener(popup) {
  const popupCloseButton = popup.querySelector(".popup__close-button");
  popupCloseButton.removeEventListener("click", popupCloseHandler);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");

  addCloseButtonListener(popup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  removeCloseButtonListener(popup);
}

function toggleSubmitBtnWithoutInputEvent(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButton = formElement.querySelector(".popup__submit-button");

  toggleSubmitButtonState(inputList, submitButton, {inactiveButtonClass: 'popup__submit-button_disabled'});
}

function infoPopupOpenHandler() {
  profileTopInput.value = profileTitle.textContent;
  profileBottomInput.value = profileSubtitle.textContent;

  toggleSubmitBtnWithoutInputEvent(profileFormElement);
  openPopup(profilePopup);
}

function cardPopupOpenHandler() {
  cardTopInput.value = "";
  cardBottomInput.value = "";

  toggleSubmitBtnWithoutInputEvent(cardFormElement);
  openPopup(cardPopup);
}

function infoFormSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileTopInput.value;
  profileSubtitle.textContent = profileBottomInput.value;

  popupCloseHandler();
}

function cardFormSubmitHandler(evt) {
  evt.preventDefault();

  renderPhotoCard({ name: cardTopInput.value, link: cardBottomInput.value, alt: cardTopInput.value });

  popupCloseHandler();
}

function likeButtonHandler(evt) {
  evt.target.closest(".photo-cards__like-button").classList.toggle("photo-cards__like-button_active");
}

function deleteButtonHandler(evt) {
  evt.target.closest(".photo-cards__element").remove();
}

function pictureClickHandler(cardLink, cardCaption, cardImgAlt) {
  const photoPopupImage = photoPopup.querySelector(".popup__image");
  const photoPopupCaption = photoPopup.querySelector(".popup__image-caption");

  photoPopupImage.setAttribute("src", cardLink);
  photoPopupImage.setAttribute("alt", cardImgAlt);
  photoPopupCaption.textContent = cardCaption;

  openPopup(photoPopup);
}

function generatePhotoCard(cardsElement) {
  const newPhotoCard = photoCardsTemplate.cloneNode(true);

  const photoCardTitle = newPhotoCard.querySelector(".photo-cards__title");
  photoCardTitle.textContent = cardsElement.name;

  const photoCardPicture = newPhotoCard.querySelector(".photo-cards__picture");
  photoCardPicture.setAttribute("src", cardsElement.link);
  photoCardPicture.setAttribute("alt", cardsElement.alt);

  photoCardPicture.addEventListener("click", () => {
    pictureClickHandler(cardsElement.link, cardsElement.name, cardsElement.alt);
  });

  const likeButton = newPhotoCard.querySelector(".photo-cards__like-button");
  likeButton.addEventListener("click", likeButtonHandler);

  const deleteButton = newPhotoCard.querySelector(".photo-cards__delete-button");
  deleteButton.addEventListener("click", deleteButtonHandler);

  return newPhotoCard;
}

function renderPhotoCard(cardsElement) {
  photoCardsContainer.prepend(generatePhotoCard(cardsElement));
}

initialCards.forEach((cardsElement) => {
  renderPhotoCard(cardsElement);
});

profileEditButton.addEventListener("click", infoPopupOpenHandler);
cardAddButton.addEventListener("click", cardPopupOpenHandler);
profileFormElement.addEventListener('submit', infoFormSubmitHandler);
cardFormElement.addEventListener('submit', cardFormSubmitHandler);

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

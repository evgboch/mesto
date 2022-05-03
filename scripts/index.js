const profilePopup = document.querySelector(".popup_profile");
const profileFormElement = profilePopup.querySelector(".popup__container_profile");
const profilePopupCloseButton = profileFormElement.querySelector(".popup__close-button_profile");
const profileTopInput = profileFormElement.querySelector(".popup__input[name = nameField]");
const profileBottomInput = profileFormElement.querySelector(".popup__input[name = descriptionField]");
const profilePopupTitle = profileFormElement.querySelector(".popup__title_profile");

const cardPopup = document.querySelector(".popup_card");
const cardFormElement = cardPopup.querySelector(".popup__container_card");
const cardPopupCloseButton = cardFormElement.querySelector(".popup__close-button_card");
const cardTopInput = cardFormElement.querySelector(".popup__input[name = cardNameField]");
const cardBottomInput = cardFormElement.querySelector(".popup__input[name = linkField]");
const cardPopupTitle = cardFormElement.querySelector(".popup__title_card");

const photoPopup = document.querySelector(".popup_photo");
const photoPopupCloseButton = photoPopup.querySelector(".popup__close-button_photo");

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const profileEditButton = profile.querySelector(".profile__edit-button");
const cardAddButton = profile.querySelector(".profile__add-button");

const photoCardsContainer = document.querySelector(".photo-cards__grid");
const photoCardsTemplate = document.querySelector(".photo-cards-template").content.querySelector(".photo-cards__element");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function infoPopupOpenHandler() {
  profilePopupTitle.textContent = "Редактировать профиль";
  profileTopInput.setAttribute("placeholder", "Жак-Ив Кусто");
  profileBottomInput.setAttribute("placeholder", "Исследователь океана");
  profileTopInput.value = profileTitle.textContent;
  profileBottomInput.value = profileSubtitle.textContent;

  openPopup(profilePopup);

  profilePopupCloseButton.addEventListener("click", infoPopupCloseHandler);
  profileFormElement.addEventListener('submit', infoFormSubmitHandler);
}

function cardPopupOpenHandler() {
  cardPopupTitle.textContent = "Новое место";
  cardTopInput.setAttribute("placeholder", "Название");
  cardBottomInput.setAttribute("placeholder", "Ссылка на картинку");

  openPopup(cardPopup);

  cardPopupCloseButton.addEventListener("click", cardPopupCloseHandler);
  cardFormElement.addEventListener('submit', cardFormSubmitHandler);
}

function infoPopupCloseHandler() {
  profileTopInput.value = "";
  profileBottomInput.value = "";

  closePopup(profilePopup);
}

function cardPopupCloseHandler() {
  cardTopInput.value = "";
  cardBottomInput.value = "";

  closePopup(cardPopup);
}

function infoFormSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = profileTopInput.value;
  profileSubtitle.textContent = profileBottomInput.value;

  infoPopupCloseHandler();
}

function cardFormSubmitHandler(evt) {
  evt.preventDefault();

  renderPhotoCard({ name: cardTopInput.value, link: cardBottomInput.value, alt: cardTopInput.value });

  cardPopupCloseHandler();
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

  photoPopupCloseButton.addEventListener("click", () => {
    closePopup(photoPopup);
  });
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

const initialCards = [
  {
    name: "Бостон",
    link: "../images/boston.jpg",
    alt: "Бостон"
  },
  {
    name: "Парати",
    link: "../images/paraty.jpg",
    alt: "Парати"
  },
  {
    name: "Большой каньон",
    link: "../images/grand-canyon.jpg",
    alt: "Большой каньон"
  },
  {
    name: "Провинция Фарс",
    link: "../images/fars-province.jpg",
    alt: "Провинция Фарс"
  },
  {
    name: "Мальдивы",
    link: "../images/maldives.jpg",
    alt: "Мальдивы"
  },
  {
    name: "Мадрид",
    link: "../images/madrid.jpg",
    alt: "Мадрид"
  }
];

const popup = document.querySelector(".popup");
const formElement = popup.querySelector(".popup__container");
const closePopupButton = formElement.querySelector(".popup__close-button");
const topInput = formElement.querySelector(".popup__input[name = topField]");
const bottomInput = formElement.querySelector(".popup__input[name = bottomField]");
const popupTitle = formElement.querySelector(".popup__title");

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const openPopupButton = profile.querySelector(".profile__edit-button");
const addCardButton = profile.querySelector(".profile__add-button");

const photoCardsContainer = document.querySelector(".photo-cards__grid");
const photoCardsTemplate = document.querySelector(".photo-cards-template").content.querySelector(".photo-cards__element");

function infoPopupOpen() {
  popup.classList.add("popup_opened");
  popupTitle.textContent = "Редактировать профиль";
  topInput.setAttribute("placeholder", "Жак-Ив Кусто");
  bottomInput.setAttribute("placeholder", "Исследователь океана");
  topInput.value = profileTitle.textContent;
  bottomInput.value = profileSubtitle.textContent;
}

function photoPopupOpen() {
  popup.classList.add("popup_opened");
  popupTitle.textContent = "Новое место";
  topInput.setAttribute("placeholder", "Название");
  bottomInput.setAttribute("placeholder", "Ссылка на картинку");
}

function popupClose() {
  popup.classList.remove("popup_opened");
  topInput.value = "";
  bottomInput.value = "";
}

openPopupButton.addEventListener("click", infoPopupOpen);
addCardButton.addEventListener("click", photoPopupOpen);
closePopupButton.addEventListener("click", popupClose);

function formSubmitHandler(evt) {
  evt.preventDefault();

  if (popupTitle.textContent === "Редактировать профиль") {
    profileTitle.textContent = topInput.value;
    profileSubtitle.textContent = bottomInput.value;
  }

  else if (popupTitle.textContent === "Новое место") {
    renderPhotoCard({ name: topInput.value, link: bottomInput.value, alt: topInput.value });
  }

  popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);

function likeButtonHandler(evt) {
  evt.target.closest(".photo-cards__like-button").classList.toggle("photo-cards__like-button_active");
}

function deleteButtonHandler(evt) {
  evt.target.closest(".photo-cards__element").remove();
}

function generatePhotoCard(cardsElement) {
  const newPhotoCard = photoCardsTemplate.cloneNode(true);

  const photoCardTitle = newPhotoCard.querySelector(".photo-cards__title");
  photoCardTitle.textContent = cardsElement.name;

  const photoCardPicture = newPhotoCard.querySelector(".photo-cards__picture");
  photoCardPicture.setAttribute("src", cardsElement.link);
  photoCardPicture.setAttribute("alt", cardsElement.alt);

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

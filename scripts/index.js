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

const openPopupButton = document.querySelector(".profile__edit-button");

const popup = document.querySelector(".popup");
const formElement = popup.querySelector(".popup__container");
const closePopupButton = formElement.querySelector(".popup__close-button");
const nameInput = formElement.querySelector(".popup__input[name = nameField]");
const jobInput = formElement.querySelector(".popup__input[name = jobField]");

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

const photoCardsContainer = document.querySelector(".photo-cards__grid");
const photoCardsTemplate = document.querySelector(".photo-cards-template").content.querySelector(".photo-cards__element");

function popupOpenToggle() {
  popup.classList.toggle("popup_opened");
  nameInput.setAttribute("value", profileTitle.textContent);
  jobInput.setAttribute("value", profileSubtitle.textContent);
}

openPopupButton.addEventListener("click", popupOpenToggle);
closePopupButton.addEventListener("click", popupOpenToggle);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupOpenToggle();
}

formElement.addEventListener('submit', formSubmitHandler);

function generatePhotoCard(cardsElement) {
  const newPhotoCard = photoCardsTemplate.cloneNode(true);

  const photoCardTitle = newPhotoCard.querySelector(".photo-cards__title");
  photoCardTitle.textContent = cardsElement.name;

  const photoCardPicture = newPhotoCard.querySelector(".photo-cards__picture");
  photoCardPicture.setAttribute("src", cardsElement.link);
  photoCardPicture.setAttribute("alt", cardsElement.alt);

  return newPhotoCard;
}

function renderPhotoCard(cardsElement) {
  photoCardsContainer.prepend(generatePhotoCard(cardsElement));
}

initialCards.forEach((cardsElement) => {
  renderPhotoCard(cardsElement);
});

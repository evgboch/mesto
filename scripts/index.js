const openPopupButton = document.querySelector(".profile__edit-button");

const popup = document.querySelector(".popup");
const formElement = popup.querySelector(".popup__container");
const closePopupButton = formElement.querySelector(".popup__close-button");
const nameInput = formElement.querySelector(".popup__name-field");
const jobInput = formElement.querySelector(".popup__job-field");

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

function popupOpenToggle() {
  popup.classList.toggle("popup_opened");
  nameInput.setAttribute("value", profileTitle.textContent);
  jobInput.setAttribute("value", profileSubtitle.textContent);
}

openPopupButton.addEventListener("click", popupOpenToggle);
closePopupButton.addEventListener("click", popupOpenToggle);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupOpenToggle();
}

formElement.addEventListener('submit', formSubmitHandler);

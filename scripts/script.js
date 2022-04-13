const openPopupButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = popup.querySelector(".popup_close-button");

function popupOpenToggle() {
  popup.classList.toggle("popup_opened");
}

openPopupButton.addEventListener("click", popupOpenToggle);
closePopupButton.addEventListener("click", popupOpenToggle);

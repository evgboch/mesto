import { openPopup } from "./utils.js";

export class Card {
  constructor (cardsData, templateSelector) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._alt = cardsData.alt;
    this._templateSelector = templateSelector;
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle("photo-cards__like-button_active");
  }

  _handleDeleteButton(evt) {
    evt.target.closest(".photo-cards__element").remove();
  }

  _handlePictureClick(cardLink, cardCaption, cardImgAlt) {
    const photoPopup = document.querySelector(".popup_photo");
    const photoPopupImage = photoPopup.querySelector(".popup__image");
    const photoPopupCaption = photoPopup.querySelector(".popup__image-caption");

    photoPopupImage.setAttribute("src", cardLink);
    photoPopupImage.setAttribute("alt", cardImgAlt);
    photoPopupCaption.textContent = cardCaption;

    openPopup(photoPopup);
  }


  generatePhotoCard() {
    const photoCardsTemplate = document.querySelector(this._templateSelector).content.querySelector(".photo-cards__element");
    const newPhotoCard = photoCardsTemplate.cloneNode(true);

    const photoCardTitle = newPhotoCard.querySelector(".photo-cards__title");
    photoCardTitle.textContent = this._name;

    const photoCardPicture = newPhotoCard.querySelector(".photo-cards__picture");
    photoCardPicture.setAttribute("src", this._link);
    photoCardPicture.setAttribute("alt", this._alt);

    photoCardPicture.addEventListener("click", () => {
      this._handlePictureClick(this._link, this._name, this._alt);
    });

    const likeButton = newPhotoCard.querySelector(".photo-cards__like-button");
    likeButton.addEventListener("click", this._handleLikeButton);

    const deleteButton = newPhotoCard.querySelector(".photo-cards__delete-button");
    deleteButton.addEventListener("click", this._handleDeleteButton);

    return newPhotoCard;
  }
}

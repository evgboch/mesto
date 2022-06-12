export class Card {
  constructor (cardsData, templateSelector, handlePictureClick) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._alt = cardsData.alt;
    this._handlePictureClick = handlePictureClick;
    this._newPhotoCard = document.querySelector(templateSelector).content.querySelector(".photo-cards__element").cloneNode(true);
    this._photoCardTitle = this._newPhotoCard.querySelector(".photo-cards__title");
    this._photoCardPicture = this._newPhotoCard.querySelector(".photo-cards__picture");
    this._likeButton = this._newPhotoCard.querySelector(".photo-cards__like-button");
    this._deleteButton = this._newPhotoCard.querySelector(".photo-cards__delete-button");
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle("photo-cards__like-button_active");
  }

  _handleDeleteButton(evt) {
    evt.target.closest(".photo-cards__element").remove();
  }

  _setEventListeners() {
    this._photoCardPicture.addEventListener("click", () => {
      this._handlePictureClick(this._link, this._name, this._alt);
    });
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
  }

  generatePhotoCard() {
    this._photoCardTitle.textContent = this._name;
    this._photoCardPicture.setAttribute("src", this._link);
    this._photoCardPicture.setAttribute("alt", this._alt);

    this._setEventListeners();

    return this._newPhotoCard;
  }
}

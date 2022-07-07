export class Card {
  constructor (cardsData, templateSelector, handleCardClick) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._alt = cardsData.name;
    this._likes = cardsData.likes;
    this._handleCardClick = handleCardClick;
    this._newPhotoCard = document.querySelector(templateSelector).content.querySelector(".photo-cards__element").cloneNode(true);
    this._photoCardTitle = this._newPhotoCard.querySelector(".photo-cards__title");
    this._photoCardPicture = this._newPhotoCard.querySelector(".photo-cards__picture");
    this._likeButton = this._newPhotoCard.querySelector(".photo-cards__like-button");
    this._likesCounter = this._newPhotoCard.querySelector(".photo-cards__like-counter");
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
      this._handleCardClick(this._link, this._name, this._alt);
    });
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
  }

  generatePhotoCard() {
    this._photoCardTitle.textContent = this._name;
    this._photoCardPicture.setAttribute("src", this._link);
    this._photoCardPicture.setAttribute("alt", this._alt);
    this._likesCounter.textContent = this._likes.length;

    this._setEventListeners();

    return this._newPhotoCard;
  }
}

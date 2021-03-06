export class Card {
  constructor (cardsData, userId, templateSelector, handleCardClick, handleDeleteButton, handleLikeAddition, handleLikeRemoval) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._alt = cardsData.name;
    this._likes = cardsData.likes;
    this.cardId = cardsData._id;
    this._ownerId = cardsData.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeAddition = handleLikeAddition;
    this._handleLikeRemoval = handleLikeRemoval;
    this._newPhotoCard = document.querySelector(templateSelector).content.querySelector(".photo-cards__element").cloneNode(true);
    this._photoCardTitle = this._newPhotoCard.querySelector(".photo-cards__title");
    this._photoCardPicture = this._newPhotoCard.querySelector(".photo-cards__picture");
    this._likeButton = this._newPhotoCard.querySelector(".photo-cards__like-button");
    this._likesCounter = this._newPhotoCard.querySelector(".photo-cards__like-counter");
    this._deleteButton = this._newPhotoCard.querySelector(".photo-cards__delete-button");
  }

  _setEventListeners() {
    this._photoCardPicture.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name, this._alt);
    });

    this._likeButton.addEventListener("click", () => {
      if (!this._checkIfUserLiked()) {
        this._handleLikeAddition(this);
      } else {
        this._handleLikeRemoval(this);
      }
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton(this);
    });
  }

  toggleLike(res) {
    this._likeButton.classList.toggle("photo-cards__like-button_active");
    this._likesCounter.textContent = res.likes.length;
    this._likes = res.likes;
  }

  removeCard() {
    this._newPhotoCard.remove();
  }

  _checkIfUserLiked() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  generatePhotoCard() {
    this._photoCardTitle.textContent = this._name;
    this._photoCardPicture.setAttribute("src", this._link);
    this._photoCardPicture.setAttribute("alt", this._alt);
    this._likesCounter.textContent = this._likes.length;

    if (this._ownerId === this._userId) {
      this._deleteButton.classList.add("photo-cards__delete-button_active");
    }

    if (this._checkIfUserLiked()) {
      this._likeButton.classList.toggle("photo-cards__like-button_active");
    }

    this._setEventListeners();

    return this._newPhotoCard;
  }
}

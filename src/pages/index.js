import '../pages/index.css'; // добавили импорт главного файла стилей
import { Api } from '../components/Api.js';
import { validationData } from "../utils/constants.js"
import { initialCards } from "../utils/cardsData.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const cardAddButton = profile.querySelector(".profile__add-button");
const avatarEditor = document.querySelector(".profile__avatar-overlay");

let userId = null;

const formValidators = {};

function enableValidation(validationParams) {
  const formList = Array.from(document.querySelectorAll(validationParams.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(validationParams, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

function handleCardClick(link, name, alt) {
  imagePopupInstance.open(link, name, alt);
}

function createCard(cardData) {
  const cardsInstance = new Card(cardData, userId, ".photo-cards-template", handleCardClick,
    (card) => {
      confirmationPopupInstance.open();
      confirmationPopupInstance.setSubmitAction(() => {
        api.deleteCard(card.cardId)
          .then(() => {
            cardsInstance.removeCard();
            confirmationPopupInstance.close();
          })
          .catch((err) => {
            console.log(err);
          })
      });
    },

    (card) => {
      api.addLike(card.cardId)
        .then((res) => {
          cardsInstance.toggleLike(res);
        })
        .catch((err) => {
          console.log(err);
        })
    },

    (card) => {
      api.removeLike(card.cardId)
        .then((res) => {
          cardsInstance.toggleLike(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  );

  return cardsInstance.generatePhotoCard();
}

function openProfilePopup() {
  const userInfo = userInfoInstance.getUserInfo();
  formPopupInstance.open(userInfo);
  formValidators["popupProfileForm"].resetValidation();
}

function openCardPopup() {
  const clearValues = {
    place: "",
    link: ""
  }
  cardPopupInstance.open(clearValues);
  formValidators["popupCardForm"].resetValidation();
}

function openAvatarPopup() {
  const clearValues = {
    "avatar-link": ""
  }
  avatarPopupInstance.open(clearValues);
  formValidators["popupAvatarForm"].resetValidation();
}

const imagePopupInstance = new PopupWithImage(".popup_photo");

const confirmationPopupInstance = new PopupWithConfirmation(".popup_confirmation");

const sectionInstance = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardsElement = createCard(item);
    sectionInstance.addItem(cardsElement);
}}, ".photo-cards__grid");

const userInfoInstance = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileSubtitleSelector: ".profile__subtitle",
  profileAvatarSelector: ".profile__avatar"
});

const formPopupInstance = new PopupWithForm({
  popupSelector: ".popup_profile",
  handleFormSubmition: (formData) => {
    formPopupInstance.formSending(true);
    api.editUserInfo({
      name: formData.nameField,
      description: formData.descriptionField
    })
      .then((data) => {
        userInfoInstance.editUserInfo({
          name: data.name,
          description: data.about
        });

        formPopupInstance.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formPopupInstance.formSending(false);
      })
  }
});

const cardPopupInstance = new PopupWithForm({
  popupSelector: ".popup_card",
  handleFormSubmition: (item) => {
    cardPopupInstance.formSending(true);
    api.addNewCard({
      name: item.name,
      link: item.link
    })
      .then((res) => {
        sectionInstance.renderer(res);
        cardPopupInstance.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        cardPopupInstance.formSending(false);
      })
  }
});

const avatarPopupInstance = new PopupWithForm({
  popupSelector: ".popup_avatar",
  handleFormSubmition: (formData) => {
    avatarPopupInstance.formSending(true);
    api.editAvatar(formData["avatar-link"])
      .then((data) => {
        userInfoInstance.editAvatar({
          name: data.name,
          avatarLink: data.avatar
        });

        avatarPopupInstance.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarPopupInstance.formSending(false);
      })
  }
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "8848ee4a-47e5-4bf2-b34e-b286c4490bd6",
    "Content-Type": "application/json"
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userId = data._id;
    userInfoInstance.setUserInfo({
      name: data.name,
      description: data.about,
      avatarLink: data.avatar
    });
    sectionInstance.renderSection(cards);
  })
  .catch(([err]) => {
    console.log(err);
  });

imagePopupInstance.setEventListeners();
cardPopupInstance.setEventListeners();
formPopupInstance.setEventListeners();
avatarPopupInstance.setEventListeners();
confirmationPopupInstance.setEventListeners();

profileEditButton.addEventListener("click", openProfilePopup);
cardAddButton.addEventListener("click", openCardPopup);
avatarEditor.addEventListener("click", openAvatarPopup)

enableValidation(validationData);

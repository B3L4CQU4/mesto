import "./index.css";

import { config } from '../utils/data.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: '467902c0-4923-4482-bd79-cb7fafe103fe',
    'Content-Type': 'application/json'
  }
});

// Находим попап редактирования профайла и его элементы
const profileEditPopup = document.querySelector('#profileEditPopup');
const profileFormElement = profileEditPopup.querySelector('#infoEditForm');
const profileEditOpenBtn = document.querySelector('.profile').querySelector('.profile__edit-btn');

// Находим попап добавления карточки и его элементы
const addCardPopup = document.querySelector('#addCardPopup');
const addCardFormElement = addCardPopup.querySelector('#addCardForm');

const addCardBtn = document.querySelector('.profile').querySelector('.profile__add-btn');

// Функция для рендеринга карточки
function cardRenderer(item) {
  const cardElement = createCard(item);
  cardSection.addItemPrepend(cardElement);
}

// Создание экземпляра UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__img');

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      _id: userData._id,
      avatar: userData.avatar
    });

    const renderedCards = cardsData.map(cardData => createCard(cardData));
    renderedCards.forEach(card => {
      cardSection.addItemAppend(card);
    });
  })
  .catch(err => {
    console.error(`Ошибка при получении данных: ${err}`);
  });

const cardSection = new Section({ renderer: cardRenderer }, '.elements');

const imagePopup = new PopupWithImage('#popup_image', '.popup__image', '.popup__image-title');
imagePopup.setEventListeners();

function handleCardClick(src, alt) {
  imagePopup.open(src, alt);
}

const delPopupInstance = new PopupWithDelete('#delPopup', function() {
  api.deleteCard(this._cardInstance._cardId)
      .then(() => {
          this._cardInstance._removeCard();
          delPopupInstance.close();
      })
      .catch(err => {
          console.error(`Ошибка при удалении карточки: ${err}`);
      });
});

function handleConfirmDelete(cardInstance) {
  delPopupInstance.open(cardInstance);
}



function createCard(cardData) {
  const card = new Card(
    cardData,
    '#element-cards',
    handleCardClick,
    () => userInfo.getUserId(),
    handleConfirmDelete,
    api.likeCard.bind(api),
    api.unlikeCard.bind(api)
  )
  return card.makeCard();
}

const addCardPopupInstance = new PopupWithForm('#addCardPopup', (formData) => {
  api.addCard(formData.title, formData.URL)
    .then(data => {
      return createCard(data);
    })
    .then(card => {
      cardSection.addItemPrepend(card);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      addCardPopupInstance.close()
      addCardPopupInstance.setSubmitButtonText('Сохранить');
    });
});

addCardPopupInstance.setEventListeners();

const profileEditPopupInstance = new PopupWithForm('#profileEditPopup', (formData) => {
  api.updateProfile(formData.name, formData.job)
    .then(data => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about
      });
    })
    .catch(err => {
      console.error(err);
    })
    .finally(()=> {
      profileEditPopupInstance.close();
      profileEditPopupInstance.setSubmitButtonText('Сохранить');
    });
});

profileEditPopupInstance.setEventListeners();

// Обработчики событий для попапов
profileEditOpenBtn.addEventListener('click', () => {
  profileEditPopupInstance.open();
  profileEditPopupInstance.setInputValues(userInfo.getUserInfo());
  validatorProfileForm.resetValidationState();
});

addCardBtn.addEventListener('click', () => {
  addCardPopupInstance.open();
  validatorAddCardForm.resetValidationState();
});

const zoomPopupInstance = new Popup('#popup_image');
zoomPopupInstance.setEventListeners();

const avatarEditPopup = document.querySelector('#avatarEditPopup');
const avatarEditForm = avatarEditPopup.querySelector('#avatarEditForm');

const avatarEditPopupInstance = new PopupWithForm('#avatarEditPopup', (formData) => {
  api.updateAvatar(formData.avatarUrl)
    .then(data => {
      userInfo.setAvatar(data.avatar);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      avatarEditPopupInstance.close();
      avatarEditPopupInstance.setSubmitButtonText('Сохранить');
    });
});
avatarEditPopupInstance.setEventListeners();

const avatarEditButton = document.querySelector('.profile__avatar-edit');
avatarEditButton.addEventListener('click', () => {
  avatarEditPopupInstance.open();
  validatorAvatarEditForm.resetValidationState();
});

// Включение валидации
const validatorProfileForm = new FormValidator(config, profileFormElement);
validatorProfileForm.enableValidation();

const validatorAddCardForm = new FormValidator(config, addCardFormElement);
validatorAddCardForm.enableValidation();

const validatorAvatarEditForm = new FormValidator(config, avatarEditForm);
validatorAvatarEditForm.enableValidation();



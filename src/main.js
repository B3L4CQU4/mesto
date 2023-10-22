import "./pages/index.css";

import { initialCards, config } from './components/data.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Api from './components/Api.js';

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
  cardSection.addItem(cardElement);
}

// Создание экземпляра UserInfo
const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__img');

api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      _id: userData._id,
      avatar: userData.avatar
    });
  })
  .catch((err) => {
    console.log(`Ошибка при получении данных о пользователе: ${err}`);
  });

const cardSection = new Section({ renderer: cardRenderer }, '.elements');

api.getInitialCards()
  .then((cardsData) => {
    return Promise.all(cardsData.map(createCard)); // createCard возвращает промис
  })
  .then(renderedCards => {
    renderedCards.forEach(card => {
      cardSection.addItem(card);
    });
  })
  .catch((err) => {
    console.log(`Ошибка при получении начальных карточек: ${err}`);
  });

const delPopupInstance = new Popup('#delPopup');
delPopupInstance.setEventListeners();

const imagePopup = new PopupWithImage('#popup_image', '.popup__image', '.popup__image-title');
imagePopup.setEventListeners();



function handleCardClick(src, alt) {
  imagePopup.open(src, alt);
}

function handleConfirmDelete(cardInstance) {
  delPopupInstance.open();
  const confirmDeleteButton = document.querySelector('#delPopup .popup__save-btn');
  const confirmDeleteHandler = () => {
    api.deleteCard(cardInstance._cardId)
      .then(() => {
        cardInstance._removeCard();
        delPopupInstance.close();
      })
      .catch(err => {
        console.error(`Ошибка при удалении карточки: ${err}`);
      })
      .finally(() => {
        confirmDeleteButton.removeEventListener('click', confirmDeleteHandler);
      });
  };
  confirmDeleteButton.addEventListener('click', confirmDeleteHandler);
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
      return createCard(data); // createCard возвращает промис
    })
    .then(card => {
      cardSection.addItem(card);
      addCardPopupInstance.close();
    })
    .catch(err => {
      console.error(err);
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
      profileEditPopupInstance.close();
    })
    .catch(err => {
      console.error(err);
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
      avatarEditPopupInstance.close();
    })
    .catch(err => {
      console.error(err);
    });
});
avatarEditPopupInstance.setEventListeners();

const avatarEditButton = document.querySelector('.profile__avatar-edit');
avatarEditButton.addEventListener('click', () => {
  avatarEditPopupInstance.open();
});

// Включение валидации
const validatorProfileForm = new FormValidator(config, profileFormElement);
validatorProfileForm.enableValidation();

const validatorAddCardForm = new FormValidator(config, addCardFormElement);
validatorAddCardForm.enableValidation();

const validatorAvatarEditForm = new FormValidator(config, avatarEditForm);
validatorAvatarEditForm.enableValidation();



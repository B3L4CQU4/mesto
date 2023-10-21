import "./pages/index.css";

import { initialCards, config } from './components/data.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

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
const userInfo = new UserInfo('.profile__name', '.profile__job');

const imagePopup = new PopupWithImage('#popup_image', '.popup__image', '.popup__image-title');
imagePopup.setEventListeners();

const cardSection = new Section({ renderer: cardRenderer }, '.elements');
cardSection.renderItems(initialCards);

function showImage(src, alt) {
  imagePopup.open(src, alt);
}

function createCard(cardData) {
  const card = new Card(cardData, '#element-cards', showImage);
  return card.makeCard();
}

const addCardPopupInstance = new PopupWithForm('#addCardPopup', (formData) => {
  cardRenderer({
    name: formData.title,
    link: formData.URL,
  });
});

addCardPopupInstance.setEventListeners();

const profileEditPopupInstance = new PopupWithForm('#profileEditPopup', (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.job,
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

// Включение валидации
const validatorProfileForm = new FormValidator(config, profileFormElement);
validatorProfileForm.enableValidation();

const validatorAddCardForm = new FormValidator(config, addCardFormElement);
validatorAddCardForm.enableValidation();






import "../pages/index.css";

import { initialCards, config } from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// находим попап редактирования профайла
const profileEditPopup = document.querySelector('#profileEditPopup');
// Находим форму редактирования профайла в DOM
const profileFormElement = profileEditPopup.querySelector('#infoEditForm');
// Находим поля формы редактирования профайла в DOM
const nameInput = profileFormElement.querySelector('#nameInput');
const jobInput = profileFormElement.querySelector('#jobInput');
// находим кнопку редактировать в профайле
const profileEditOpenBtn = document.querySelector('.profile').querySelector('.profile__edit-btn');
// находим кнопку закрыть в попапе
const profileEditCloseBtn = profileEditPopup.querySelector('.popup__close-btn');
// находим профайл инфо
const profileInfo = document.querySelector('.profile__info');
// находим имя и описание
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__job');

// находим попап добавления карточки
const addCardPopup = document.querySelector('#addCardPopup');
// Находим форму добавления карточки в DOM
const addCardFormElement = addCardPopup.querySelector('#addCardForm');
// Находим поля формы добавления карточки в DOM
const inputTitleFormAddCard = addCardFormElement.querySelector('#titleInput');
const inputUrlFormAddCard = addCardFormElement.querySelector('#urlInput');
// находим кнопку добавить в профайле
const addCardBtn = document.querySelector('.profile').querySelector('.profile__add-btn');
// находим кнопку закрыть в попапе
const addCardCloseBtn = addCardPopup.querySelector('.popup__close-btn');

const zoomPopup = document.querySelector('#popup_image');
const zoomCloseButton = zoomPopup.querySelector('.popup__close-btn');

function cardRenderer(item) {
  const cardElement = createCard(item);
  cardSection.addItem(cardElement);
}

const userInfo = new UserInfo('.profile__name', '.profile__job');

const imagePopup = new PopupWithImage('#popup_image', '.popup__image', '.popup__image-title');
imagePopup.setEventListeners();

const cardSection = new Section({ items: initialCards, renderer: cardRenderer }, '.elements');
cardSection.renderItems();

function createCard(cardData) {
  const card = new Card(cardData, '#element-cards', imagePopup);
  return card.makeCard();
}

const addCardPopupInstance = new PopupWithForm('#addCardPopup', (formData) => {
  const newCard = createCard({
    name: formData.title,
    link: formData.URL
  });
  const elementsSection = document.querySelector('.elements');
  elementsSection.prepend(newCard);
});

addCardPopupInstance.setEventListeners();

const profileEditPopupInstance = new PopupWithForm('#profileEditPopup', (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.job,
  });
});

profileEditPopupInstance.setEventListeners();

// вызов функций переключения и обновления данных по кнопке редактировать профиль
profileEditOpenBtn.addEventListener('click', () => {
  profileEditPopupInstance.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  validatorProfileForm.resetValidationState();
});
// вызов функций переключения на клик по кнопке добавить
addCardBtn.addEventListener('click', () => {
  addCardPopupInstance.open();
  validatorAddCardForm.resetValidationState();
});

const zoomPopupInstance = new Popup('#popup_image');
zoomPopupInstance.setEventListeners();

// включение валидации
const validatorProfileForm = new FormValidator(config, profileFormElement);
validatorProfileForm .enableValidation();
const validatorAddCardForm = new FormValidator(config, addCardFormElement);
validatorAddCardForm.enableValidation();





import "../pages/index.css";

import { initialCards, config } from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// Находим попап редактирования профайла и его элементы
const profileEditPopup = document.querySelector('#profileEditPopup');
const profileFormElement = profileEditPopup.querySelector('#infoEditForm');
const nameInput = profileFormElement.querySelector('#nameInput');
const jobInput = profileFormElement.querySelector('#jobInput');
const profileEditOpenBtn = document.querySelector('.profile').querySelector('.profile__edit-btn');

// Находим попап добавления карточки и его элементы
const addCardPopup = document.querySelector('#addCardPopup');
const addCardFormElement = addCardPopup.querySelector('#addCardForm');
const inputTitleFormAddCard = addCardFormElement.querySelector('#titleInput');
const inputUrlFormAddCard = addCardFormElement.querySelector('#urlInput');
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

// Обработчики событий для попапов
profileEditOpenBtn.addEventListener('click', () => {
  profileEditPopupInstance.open();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
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






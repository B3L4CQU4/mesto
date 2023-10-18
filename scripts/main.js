import Card from './Card.js';
import FormValidator from './FormValidator.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveBtnElement: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__form_invalid'
};

//находим попап редактирования профайла
const profileEditPopup = document.querySelector('#profileEditPopup');
// Находим форму редактирования профайла в DOM
const profileFormElement = profileEditPopup.querySelector('#infoEditForm');
// Находим поля формы редактирования профайла в DOM
const nameInput = profileFormElement.querySelector('#nameInput');
const jobInput = profileFormElement.querySelector('#jobInput');
//находим кнопку редактировать в профайле
const profileEditOpenBtn = document.querySelector('.profile').querySelector('.profile__edit-btn');
//находим кнопку закрыть в попапе
const profileEditCloseBtn = profileEditPopup.querySelector('.popup__close-btn');
//находим профайл инфо
const profileInfo = document.querySelector('.profile__info');
// находим имя и описание
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__job');

//находим попап добавления карточки
const addCardPopup = document.querySelector('#addCardPopup');
// Находим форму добавления карточки в DOM
const addCardFormElement = addCardPopup.querySelector('#addCardForm');
// Находим поля формы добавления карточки в DOM
const inputTitleFormAddCard = addCardFormElement.querySelector('#titleInput');
const inputUrlFormAddCard = addCardFormElement.querySelector('#urlInput');
//находим кнопку добавить в профайле
const addCardBtn = document.querySelector('.profile').querySelector('.profile__add-btn');
//находим кнопку закрыть в попапе
const addCardCloseBtn = addCardPopup.querySelector('.popup__close-btn');

const zoomPopup = document.querySelector('#popup_image');
const zoomImg = zoomPopup.querySelector('.popup__image');
const zoomImgTitle = zoomPopup.querySelector('.popup__image-title');
const zoomCloseButton = zoomPopup.querySelector('.popup__close-btn');

const popupBackground = document.querySelector('.popup');

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEscBtn);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEscBtn);
}

function closePopupEscBtn(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened')
    closePopup(popup);
    if (popup.querySelector('#addCardForm') !== null) {
      popup.querySelector('#addCardForm').reset()
    }
  }
}

//обновление данных в инпутах попапа профайла
function getInfoText() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Обработчик «отправки» формы профайла
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profileEditPopup);
}

// Обработчик «отправки» формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const name = inputTitleFormAddCard.value;
  const link = inputUrlFormAddCard.value;
  const newCardData = {
    name: name,
    link: link
  };

  const newCard = new Card(newCardData, '#element-cards').makeCard();
  const elementsSection = document.querySelector('.elements');
  elementsSection.prepend(newCard);
  closePopup(addCardPopup);

  addCardFormElement.reset();
}

// функция добавления карточек из списка
function addCardsToPage(cardsList) {
  const elementsSection = document.querySelector('.elements');

  cardsList.forEach((cardData) => {
    const card = new Card(cardData, '#element-cards').makeCard();
    elementsSection.appendChild(card);
  });
}

//вызов функций переключения и обновления данных по кнопке редактировать профиль
profileEditOpenBtn.addEventListener('click', () => {
  openPopup(profileEditPopup);
  getInfoText();
  const formElement = profileEditPopup.querySelector('.popup__form');
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});
//вызов функций переключения на клик по кнопке добавить
addCardBtn.addEventListener('click', () => {
  openPopup(addCardPopup);
  const formElement = addCardPopup.querySelector('.popup__form');
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});

//вызов закрытия попапа профайла на клик по крестику
profileEditCloseBtn.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

//вызов закрытия попапа карточки на клик по крестику
addCardCloseBtn.addEventListener('click', () => {
  closePopup(addCardPopup);
  addCardFormElement.reset();
});

//вызов закрытия попапа zoom на клик по крестику
zoomCloseButton.addEventListener('click', () => {
  closePopup(zoomPopup);
});

profileEditPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(profileEditPopup);
  }
});

addCardPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(addCardPopup)
    addCardFormElement.reset()
  }
});

zoomPopup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(zoomPopup)
  }
});

//вызов сохранения формы
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Вызов сохранения формы добавления карточки
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);

// вызов функции добавления карточек на страницу
addCardsToPage(initialCards);

export default openPopup

//находим попап редактирования профайла
const profileEditPopup = document.querySelector('#profileEditPopup')
// Находим форму редактирования профайла в DOM
const profileFormElement = profileEditPopup.querySelector('#infoEditForm')
// Находим поля формы редактирования профайла в DOM
const nameInput = profileFormElement.querySelector("#nameInput")
const jobInput = profileFormElement.querySelector("#jobInput")
//находим кнопку редактировать в профайле
const profileEditOpenBtn = document.querySelector('.profile').querySelector('.profile__edit-btn')
//находим кнопку закрыть в попапе
const profileEditCloseBtn = profileEditPopup.querySelector(".popup__close-btn")
//находим профайл инфо
const profileInfo = document.querySelector('.profile__info')
// находим имя и описание
const profileName = profileInfo.querySelector('.profile__name')
const profileJob = profileInfo.querySelector('.profile__job')

//находим попап добавления карточки
const addCardPopup = document.querySelector('#addCardPopup')
// Находим форму добавления карточки в DOM
const addCardFormElement = addCardPopup.querySelector('#addCardForm')
// Находим поля формы добавления карточки в DOM
const inputTitleFormAddCard = addCardFormElement.querySelector("#titleInput")
const inputUrlFormAddCard = addCardFormElement.querySelector("#urlInput")
//находим кнопку добавить в профайле
const addCardBtn = document.querySelector('.profile').querySelector('.profile__add-btn')
//находим кнопку закрыть в попапе
const addCardCloseBtn = addCardPopup.querySelector(".popup__close-btn")

const zoomPopup = document.querySelector('#popup_image');
const zoomImg = zoomPopup.querySelector('.popup__image');
const zoomImgTitle = zoomPopup.querySelector('.popup__image-title');
const zoomCloseButton = zoomPopup.querySelector(".popup__close-btn")

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
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

  const newCard = createCard(newCardData);
  const elementsSection = document.querySelector('.elements');
  elementsSection.prepend(newCard);
  closePopup(addCardPopup);

  // Очищаем поля формы
  addCardFormElement.reset();

}

//вызов функций переключения и обновления данных на клик по кнопке редактировать профиль
profileEditOpenBtn.addEventListener('click', () => {
  openPopup(profileEditPopup);
  getInfoText();
});
//вызов функций переключения на клик по кнопке добавить
addCardBtn.addEventListener('click', () => {
  openPopup(addCardPopup);
});

//вызов закрытия попапа профайла на клик по крестику
profileEditCloseBtn.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

//вызов закрытия попапа карточки на клик по крестику
addCardCloseBtn.addEventListener('click', () => {
  closePopup(addCardPopup);
});

//вызов закрытия попапа zoom на клик по крестику
zoomCloseButton.addEventListener('click', () => {
  closePopup(zoomPopup);
});

//вызов сохранения формы
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Вызов сохранения формы добавления карточки
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);

// функция создания карточки из темплейта
function createCard(cardData) {
  //клонируем темплейт
  const cardTemplate = document.querySelector('#element-cards');
  const cardClone = cardTemplate.content.cloneNode(true);
  // собираем значения
  const cardElement = cardClone.querySelector('.elements__card');
  const cardImage = cardClone.querySelector('.elements__img');
  const cardTitle = cardClone.querySelector('.elements__title');
  const cardLikeBtn = cardClone.querySelector('.elements__like-btn');

  // присваиваем значения
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  //получаем кнопку удаления
  const deleteButton = cardClone.querySelector('.elements__del-btn');
  //удаляем карточку по клику на кнопку
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  function getZoomData(cardData) {
    zoomImg.src = cardData.link;
    zoomImg.alt = cardData.name;
    zoomImgTitle.textContent = cardData.name;
  }
  // Открываем попап с изображением при клике на картинку
  cardImage.addEventListener('click', () => {
    getZoomData(cardData);
    openPopup(zoomPopup);
  });
  function handleLikeBtn() {
    cardLikeBtn.classList.toggle("elements__like-btn_active")
  }

  cardLikeBtn.addEventListener('click', () => {
    handleLikeBtn();
  });

  return cardElement;
}

// функция добавления карточек из списка на страницу
function addCardsToPage(cardsList) {
  const elementsSection = document.querySelector('.elements');

  cardsList.forEach(cardData => {
    const card = createCard(cardData);
    elementsSection.appendChild(card);
  });
}

// вызов функции добавления карточек на страницу
addCardsToPage(initialCards);



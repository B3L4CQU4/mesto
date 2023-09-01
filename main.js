let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//находим попап редактирования профайла
let profileEditPopup = document.querySelector('#profileEditPopup')
// Находим форму редактирования профайла в DOM
let profileFormElement = profileEditPopup.querySelector('#infoEditForm')
// Находим поля формы редактирования профайла в DOM
let nameInput = profileFormElement.querySelector("#nameInput")
let jobInput = profileFormElement.querySelector("#jobInput")
//находим кнопку редактировать в профайле
let profileEditOpenBtn = document.querySelector('.profile').querySelector('.profile__edit-btn')
//находим кнопку закрыть в попапе
let profileEditCloseBtn = profileEditPopup.querySelector(".popup__close-btn")
//находим профайл инфо
let profileInfo = document.querySelector('.profile__info')
// находим имя и описание
let profileName = profileInfo.querySelector('.profile__name')
let profileJob = profileInfo.querySelector('.profile__job')

//находим попап добавления карточки
let addCardPopup = document.querySelector('#addCardPopup')
// Находим форму добавления карточки в DOM
let addCardFormElement = addCardPopup.querySelector('#addCardForm')
// Находим поля формы добавления карточки в DOM
let titleInput = addCardFormElement.querySelector("#titleInput")
let urlInput = addCardFormElement.querySelector("#urlInput")
//находим кнопку добавить в профайле
let addCardBtn = document.querySelector('.profile').querySelector('.profile__add-btn')
//находим кнопку закрыть в попапе
let addCardCloseBtn = addCardPopup.querySelector(".popup__close-btn")

let zoomPopup = document.querySelector('#popup_image');
let zoomImg = zoomPopup.querySelector('.popup__image');
let zoomImgTitle = zoomPopup.querySelector('.popup__image-title');
let zoomCloseButton = zoomPopup.querySelector(".popup__close-btn")


//переключение видимости попапа профайла
function toggleProfilePopup() {
  profileEditPopup.classList.toggle("popup_is-opened")
}
//переключение видимости попапа добавления карточки
function toggleAddPopup() {
  addCardPopup.classList.toggle("popup_is-opened")
}

//переключение видимости попапа zoom
function toggleZoomPopup() {
  zoomPopup.classList.toggle("popup_is-opened")
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
    toggleProfilePopup();
}

// Обработчик «отправки» формы добавления карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  let name = titleInput.value;
  let link = urlInput.value;

  let newCard = createCard(name, link);
  let elementsSection = document.querySelector('.elements');
  elementsSection.prepend(newCard);
  toggleAddPopup();

  // Очищаем поля формы
  titleInput.value = '';
  urlInput.value = '';

}

//вызов функций переключения и обновления данных на клик по кнопке редактировать профиль
profileEditOpenBtn.addEventListener('click', () => {
  toggleProfilePopup();
  getInfoText();
});
//вызов функций переключения на клик по кнопке добавить
addCardBtn.addEventListener('click', toggleAddPopup);

//вызов закрытия попапа профайла на клик по крестику
profileEditCloseBtn.addEventListener('click', toggleProfilePopup);
//вызов закрытия попапа карточки на клик по крестику
addCardCloseBtn.addEventListener('click', toggleAddPopup);

//вызов закрытия попапа zoom на клик по крестику
zoomCloseButton.addEventListener('click', toggleZoomPopup);

//вызов сохранения формы
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Вызов сохранения формы добавления карточки
addCardFormElement.addEventListener('submit', handleAddCardFormSubmit);

// функция создания карточки из темплейта
function createCard(name, link) {
  //клонируем темплейт
  let cardTemplate = document.querySelector('#element-cards');
  let cardClone = cardTemplate.content.cloneNode(true);
  // собираем значения
  let cardElement = cardClone.querySelector('.elements__card');
  let cardImage = cardClone.querySelector('.elements__img');
  let cardTitle = cardClone.querySelector('.elements__title');
  let cardLikeBtn = cardClone.querySelector('.elements__like-btn');

  // присваиваем значения
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  //получаем кнопку удаления
  let deleteButton = cardClone.querySelector('.elements__del-btn');
  //удаляем карточку по клику на кнопку
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  function getZoomData(name, link) {
    zoomImg.src = link;
    zoomImg.alt = name;
    zoomImgTitle.textContent = name;
  }
  // Открываем попап с изображением при клике на картинку
  cardImage.addEventListener('click', () => {
    getZoomData(name, link);
    toggleZoomPopup();
  });
  function toggleLikeBtn() {
    cardLikeBtn.classList.toggle("elements__like-btn_active")
  }

  cardLikeBtn.addEventListener('click', () => {
    toggleLikeBtn();
  });

  return cardElement;
}

// функция добавления карточек из списка на страницу
function addCardsToPage(cardsList) {
  let elementsSection = document.querySelector('.elements');

  cardsList.forEach(cardData => {
    let card = createCard(cardData.name, cardData.link);
    elementsSection.appendChild(card);
  });
}

// вызов функции добавления карточек на страницу
addCardsToPage(initialCards);



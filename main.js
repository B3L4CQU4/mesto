// Находим форму в DOM
let formElement = document.querySelector('#infoEditForm')
// Находим поля формы в DOM
let nameInput = formElement.querySelector("#nameInput")
let jobInput = formElement.querySelector("#jobInput")
//находим кнопку редактировать в профайле
let profileEditOpenBtn = document.querySelector('.profile').querySelector('.profile__edit-btn')
//находим попап
let popupInfoEditForm = document.querySelector('.popup')
//находим кнопку закрыть в попапе
let profileEditCloseBtn = popupInfoEditForm.querySelector(".popup__close-btn")
//находим профал инфо
let profileInfo = document.querySelector('.profile__info')
// находим имя и описание
let profileName = profileInfo.querySelector('.profile__name')
let profileJob = profileInfo.querySelector('.profile__job')

//переключение видимости попапа
function togglePopup() {
  popupInfoEditForm.classList.toggle("popup_is-opened")
}
//обновление данных в инпутах попапа
function getInfoText() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup();
}

//вызов функций переключения и обновления данных на клик по кнопке редактировать профиль
profileEditOpenBtn.addEventListener('click', () => {
  togglePopup();
  getInfoText();
});

//вызов закрытия на клик по крестику
profileEditCloseBtn.addEventListener('click', togglePopup);
//вызов сохранения формы
formElement.addEventListener('submit', handleFormSubmit);

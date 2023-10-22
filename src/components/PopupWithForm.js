import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._submitButton = this._formElement.querySelector('.popup__save-btn');
  }
  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.disabled = true;
      Promise.resolve(this._submitHandler(this._getInputValues()))
        .then(() => {
          this._submitButton.textContent = 'Сохранение...';
        })
        .then(() => {
          this._formElement.reset();
        })
        .catch(error => {
          console.error('Ошибка при отправке данных на сервер:', error);
        })
    });
  }
  close() {
    super.close();
    this._formElement.reset();
    this._submitButton.disabled = false;
  }
}

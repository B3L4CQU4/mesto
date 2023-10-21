import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._formElement = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputElements = this._formElement.querySelectorAll('.popup__input');
    const inputValues = {};

    inputElements.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();
      this._submitHandler(formData);
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

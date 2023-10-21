import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setInputValues(data){
    this._inputList.forEach((input) =>{
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

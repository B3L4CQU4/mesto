class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(inputElement, errorElement);
    }
  }

  _toggleButtonState() {
    const saveBtnElement = this._formElement.querySelector(this._config.saveBtnElement);
    if (this._formElement.checkValidity()) {
      saveBtnElement.disabled = false;
      saveBtnElement.classList.remove(this._config.inactiveButtonClass);
    } else {
      saveBtnElement.disabled = 'disabled';
      saveBtnElement.classList.add(this._config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = this._formElement.querySelectorAll(this._config.inputSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._formElement.querySelectorAll(this._config.inputSelector).forEach((inputElement) => {
      this._hideInputError(inputElement, inputElement.nextElementSibling);
    });

    this._setEventListeners();
    this._toggleButtonState();
  }
}

export default FormValidator;

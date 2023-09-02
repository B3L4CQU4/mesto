const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveBtnElement: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__form_invalid'
};

function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function checkInput(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (isInputValid) {
    hideError(inputElement, errorElement, config)
  } else {
    showError(inputElement, errorElement, config)
  }
}

function toggleBtn(buttonElement, isActive, config) {
  if (isActive) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass);
  }
}

function setEvenetListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const saveBtnElement = formElement.querySelector(config.saveBtnElement);
  toggleBtn(saveBtnElement, formElement.checkValidity(), config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleBtn(saveBtnElement, formElement.checkValidity(), config);
      checkInput(inputElement, formElement, config);
    })
  })
}

function validateForms(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEvenetListener(formElement, config);
  })
}

validateForms(config);

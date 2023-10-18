import openPopup from './main.js';

class Card {
  constructor (cardData, cardSelector){
    this._name = cardData.name;
    this._link = cardData.link;
    this.cardSelector = cardSelector;
  }

  _getCardTemplate() {
    const cardClone = document
      .querySelector(this.cardSelector)
      .content.cloneNode(true);
    const cardElement = cardClone.querySelector('.elements__card');
    return cardElement;
  }

  _setEventListeners() {
    const cardLikeBtn = this._element.querySelector('.elements__like-btn');
    cardLikeBtn.addEventListener('click', () => {
        this._handleLikeBtn();
      });

    const deleteButton = this._element.querySelector('.elements__del-btn')
    deleteButton.addEventListener('click', () => {
        this._removeCard();
      });

    const cardImage = this._element.querySelector('.elements__img')
    cardImage.addEventListener('click', () => {
        this._handleZoomImage();
      });
  }

  _handleLikeBtn() {
    this._element
      .querySelector('.elements__like-btn')
      .classList.toggle('elements__like-btn_active');
  }
  _removeCard() {
    this._element.remove();
  }

  _handleZoomImage() {
    const zoomPopup = document.querySelector('#popup_image');
    const zoomImg = zoomPopup.querySelector('.popup__image');
    const zoomImgTitle = zoomPopup.querySelector('.popup__image-title');

    zoomImg.src = this._link;
    zoomImg.alt = this._name;
    zoomImgTitle.textContent = this._name;
    openPopup(zoomPopup);
  }

  makeCard() {
    this._element = this._getCardTemplate();
    this._element.querySelector('.elements__img').src = this._link;
    this._element.querySelector('.elements__img').alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card

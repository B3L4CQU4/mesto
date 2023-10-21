class Card {
  constructor (cardData, cardSelector, imagePopup){
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._imagePopup = imagePopup;

    this._element = this._getCardTemplate();
    this._likeButton = this._element.querySelector('.elements__like-btn');
    this._deleteButton = this._element.querySelector('.elements__del-btn');
    this._cardImage = this._element.querySelector('.elements__img');
  }

  _getCardTemplate() {
    const cardClone = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    const cardElement = cardClone.querySelector('.elements__card');
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
        this._handleLikeBtn();
      });

    this._deleteButton.addEventListener('click', () => {
        this._removeCard();
      });

    this._cardImage.addEventListener('click', () => {
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
    this._imagePopup.open(this._cardImage.src, this._cardImage.alt);
  }

  makeCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card

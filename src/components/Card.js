class Card {
  constructor (cardData, cardSelector, handleCardClick, getUserIdCallback, handleDeleteClick, handleLikeCallback, handleUnlikeCallback){
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._getUserIdCallback = getUserIdCallback;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCallback = handleLikeCallback;
    this._handleUnlikeCallback = handleUnlikeCallback;

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
        this._handleDeleteClick(this);;
      });

    this._cardImage.addEventListener('click', () => {
        this._handleZoomImage();
      });
  }

  _handleDeleteBtnClick() {
    delPopupInstance.open();
  }

  _removeCard() {
    this._element.remove();
    this._element = null
  }

  _handleZoomImage() {
    this._handleCardClick(this._cardImage.src, this._cardImage.alt);
  }

  _handleLikeBtn() {
    // Если кнопка лайка активна, то снимаем лайк
    if (this._likeButton.classList.contains('elements__like-btn_active')) {
      this._handleUnlikeCallback(this._cardId)
        .then((newCardData) => {
          this._likeButton.classList.remove('elements__like-btn_active');
          this._element.querySelector('.elements__likes-counter').textContent = newCardData.likes.length;
        })
        .catch((error) => {
          console.error(error);
        });
    } else { // Иначе ставим лайк
      this._handleLikeCallback(this._cardId)
        .then((newCardData) => {
          this._likeButton.classList.add('elements__like-btn_active');
          this._element.querySelector('.elements__likes-counter').textContent = newCardData.likes.length;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async makeCard() {

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.elements__title').textContent = this._name;

    const currentUserId = await this._getUserIdCallback();

    this._setEventListeners();

    this._element.querySelector('.elements__likes-counter').textContent = this._likes.length;

    if (currentUserId !== this._ownerId) {
      this._deleteButton.style.display = 'none';
    }

    if (this._likes.some(user => user._id === currentUserId)) {
      this._likeButton.classList.add('elements__like-btn_active');
    }


    return this._element;
  }
}


export default Card

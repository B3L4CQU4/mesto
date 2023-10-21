import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, imageTitleSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._title = this._popup.querySelector(imageTitleSelector);
  }

  open(link, title) {
    this._image.src = link;
    this._image.alt = title;
    this._title.textContent = title;
    super.open();
  }
}

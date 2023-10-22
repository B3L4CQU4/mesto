import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
    constructor(popupSelector, deleteHandler) {
        super(popupSelector);
        this._deleteHandler = deleteHandler;
        this._confirmDeleteButton = this._popup.querySelector('#delPopup .popup__save-btn');

        this._setEventListeners();
    }

    _setEventListeners() {
        this._confirmDeleteButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._confirmDeleteButton.disabled = true;
            this._deleteHandler();
        });

        super.setEventListeners();
    }

    open(cardInstance) {
        this._cardInstance = cardInstance;
        super.open();
    }

    close() {
        super.close();
        this._confirmDeleteButton.disabled = false;
    }

    setDeleteHandler(handler) {
        this._deleteHandler = handler;
    }
}

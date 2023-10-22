import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
    constructor(popupSelector, deleteHandler) {
        super(popupSelector);
        this.deleteHandler = deleteHandler;
        this.confirmDeleteButton = this._popup.querySelector('#delPopup .popup__save-btn');

        this.setEventListeners();
    }

    setEventListeners() {
        this.confirmDeleteButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.confirmDeleteButton.disabled = true;
            this.deleteHandler(this.cardInstance);
        });

        super.setEventListeners();
    }

    open(cardInstance) {
        this.cardInstance = cardInstance;
        super.open();
    }

    close() {
        super.close();
        this.confirmDeleteButton.disabled = false;
        delete this.cardInstance;
    }

    setDeleteHandler(handler) {
        this.deleteHandler = handler;
    }
}

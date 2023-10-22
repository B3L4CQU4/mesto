export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      id: this._id
    };
  }

  setUserInfo({ name, job, _id, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;
    if (_id) this._id = _id;
    if (avatar) this.setAvatar(avatar);
  }

  getUserId() {
    return this._id;
  }

  setAvatar(avatarUrl) {
    this._avatarElement.src = avatarUrl;
  }
}

export class UserInfo {
  constructor({profileTitleSelector, profileSubtitleSelector}) {
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      description: this._profileSubtitle.textContent
    };
  }

  setUserInfo({name, description}) {
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = description;
  }
}

export class UserInfo {
  constructor({profileTitleSelector, profileSubtitleSelector, profileAvatarSelector}) {
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      description: this._profileSubtitle.textContent
    };
  }

  setUserInfo({name, description, avatarLink}) {
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = description;
    this._profileAvatar.setAttribute("src", avatarLink);
    this._profileAvatar.setAttribute("alt", name);
  }

  editAvatar({name, avatarLink}) {
    this._profileAvatar.setAttribute("src", avatarLink);
    this._profileAvatar.setAttribute("alt", name);
  }

  editUserInfo({name, description}) {
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = description;
  }
}

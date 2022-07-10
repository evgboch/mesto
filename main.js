(()=>{"use strict";var t={};function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.p="";var n=function(){function t(e){var n=e.baseUrl,r=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=n,this._headers=r}var n,r;return n=t,(r=[{key:"_checkResponse",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"getUserInfo",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{method:"GET",headers:this._headers}).then(this._checkResponse)}},{key:"editUserInfo",value:function(t){var e=t.name,n=t.description;return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:n})}).then(this._checkResponse)}},{key:"editAvatar",value:function(t){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})}).then(this._checkResponse)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{method:"GET",headers:this._headers}).then(this._checkResponse)}},{key:"addNewCard",value:function(t){var e=t.name,n=t.link;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:n})}).then(this._checkResponse)}},{key:"deleteCard",value:function(t){return fetch("".concat(this._baseUrl,"/cards/").concat(t),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"addLike",value:function(t){return fetch("".concat(this._baseUrl,"/cards/").concat(t,"/likes"),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"removeLike",value:function(t){return fetch("".concat(this._baseUrl,"/cards/").concat(t,"/likes"),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}(),r=[{name:"Бостон",link:t.p+"72ba07256b026a9f48d1.jpg",alt:"Часовая башня"},{name:"Парати",link:t.p+"cd84986110592e9e3f58.jpg",alt:"Тропический лес"},{name:"Большой каньон",link:t.p+"f1de230025df4414cab8.jpg",alt:"Большой каньон"},{name:"Провинция Фарс",link:t.p+"05c4e0ea16cba50ccee8.jpg",alt:"Древние руины"},{name:"Мальдивы",link:t.p+"8092fa284fad2cb33d63.jpg",alt:"Морской закат"},{name:"Мадрид",link:t.p+"f747d8b57d1438a479b4.jpg",alt:"Улицы Мадрида"}];function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=function(){function t(e,n,r,o,i,a,u){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._alt=e.name,this._likes=e.likes,this.cardId=e._id,this._ownerId=e.owner._id,this._userId=n,this._handleCardClick=o,this._handleDeleteButton=i,this._handleLikeAddition=a,this._handleLikeRemoval=u,this._newPhotoCard=document.querySelector(r).content.querySelector(".photo-cards__element").cloneNode(!0),this._photoCardTitle=this._newPhotoCard.querySelector(".photo-cards__title"),this._photoCardPicture=this._newPhotoCard.querySelector(".photo-cards__picture"),this._likeButton=this._newPhotoCard.querySelector(".photo-cards__like-button"),this._likesCounter=this._newPhotoCard.querySelector(".photo-cards__like-counter"),this._deleteButton=this._newPhotoCard.querySelector(".photo-cards__delete-button")}var e,n;return e=t,(n=[{key:"_setEventListeners",value:function(){var t=this;this._photoCardPicture.addEventListener("click",(function(){t._handleCardClick(t._link,t._name,t._alt)})),this._likeButton.addEventListener("click",(function(){t._checkIfUserLiked()?t._handleLikeRemoval(t):t._handleLikeAddition(t)})),this._deleteButton.addEventListener("click",(function(){t._handleDeleteButton(t)}))}},{key:"toggleLike",value:function(t){this._likeButton.classList.toggle("photo-cards__like-button_active"),this._likesCounter.textContent=t.likes.length,this._likes=t.likes}},{key:"removeCard",value:function(){this._newPhotoCard.remove()}},{key:"_checkIfUserLiked",value:function(){var t=this;return this._likes.some((function(e){return e._id===t._userId}))}},{key:"generatePhotoCard",value:function(){return this._photoCardTitle.textContent=this._name,this._photoCardPicture.setAttribute("src",this._link),this._photoCardPicture.setAttribute("alt",this._alt),this._likesCounter.textContent=this._likes.length,this._ownerId===this._userId&&this._deleteButton.classList.add("photo-cards__delete-button_active"),this._checkIfUserLiked()&&this._likeButton.classList.toggle("photo-cards__like-button_active"),this._setEventListeners(),this._newPhotoCard}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var u=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(e.inputSelector)),this._submitButton=this._formElement.querySelector(e.submitButtonSelector),this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass}var e,n;return e=t,(n=[{key:"_showInputError",value:function(t){var e=this._formElement.querySelector("#".concat(t.id,"-error"));t.classList.add(this._inputErrorClass),e.textContent=t.validationMessage,e.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(t){var e=this._formElement.querySelector("#".concat(t.id,"-error"));t.classList.remove(this._inputErrorClass),e.classList.remove(this._errorClass),e.textContent=""}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}},{key:"_setEventListeners",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleSubmitButtonState()}))}))}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_toggleSubmitButtonState",value:function(){this._hasInvalidInput()?(this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.setAttribute("disabled","")):(this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.removeAttribute("disabled",""))}},{key:"resetValidation",value:function(){var t=this;this._toggleSubmitButtonState(),this._inputList.forEach((function(e){t._hideInputError(e)}))}},{key:"enableValidation",value:function(){this._toggleSubmitButtonState(),this._setEventListeners()}}])&&a(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var s=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._escBinder=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._escBinder)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._escBinder)}},{key:"setEventListeners",value:function(){var t=this;this._popup.addEventListener("mousedown",(function(e){e.target.classList.contains("popup_opened")&&t.close(),e.target.classList.contains("popup__close-button")&&t.close()}))}}])&&c(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function p(){return p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=h(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},p.apply(this,arguments)}function h(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=b(t)););return t}function d(t,e){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},d(t,e)}function _(t,e){if(e&&("object"===l(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return y(t)}function y(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function b(t){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},b(t)}var v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&d(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=b(r);if(o){var n=b(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return _(this,t)});function a(t){var e,n=t.popupSelector,r=t.handleFormSubmition;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,n))._handleFormSubmition=r,e._form=e._popup.querySelector(".popup__container"),e._inputList=e._popup.querySelectorAll(".popup__input"),e._submitButton=e._popup.querySelector(".popup__submit-button"),e._submitBinder=e._handleSubmition.bind(y(e)),e}return e=a,(n=[{key:"_getInputValues",value:function(){var t=this;return this._formValues={},this._inputList.forEach((function(e){t._formValues[e.name]=e.value})),this._popup.classList.contains("popup_card")&&(this._formValues.alt=this._formValues.name),this._formValues}},{key:"_handleSubmition",value:function(t){t.preventDefault(),this._handleFormSubmition(this._getInputValues())}},{key:"formSending",value:function(t){this._submitButton.textContent=t?"Сохранение...":"Сохранить"}},{key:"setEventListeners",value:function(){p(b(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._submitBinder)}},{key:"open",value:function(t){this._inputList.forEach((function(e){e.value=t[e.getAttribute("id")]})),p(b(a.prototype),"open",this).call(this)}},{key:"close",value:function(){p(b(a.prototype),"close",this).call(this),this._form.reset()}}])&&f(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(s);function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=S(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},g.apply(this,arguments)}function S(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=E(t)););return t}function w(t,e){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},w(t,e)}function C(t,e){if(e&&("object"===m(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function E(t){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},E(t)}var O=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&w(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=E(r);if(o){var n=E(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return C(this,t)});function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,t))._popupImage=e._popup.querySelector(".popup__image"),e._popupCaption=e._popup.querySelector(".popup__image-caption"),e}return e=a,(n=[{key:"open",value:function(t,e,n){this._popupImage.setAttribute("src",t),this._popupImage.setAttribute("alt",n),this._popupCaption.textContent=e,g(E(a.prototype),"open",this).call(this)}}])&&k(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(s);function L(t){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},L(t)}function P(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=I(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},j.apply(this,arguments)}function I(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=R(t)););return t}function A(t,e){return A=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},A(t,e)}function B(t,e){if(e&&("object"===L(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function R(t){return R=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},R(t)}var T=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&A(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=R(r);if(o){var n=R(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return B(this,t)});function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,t))._confirmationButton=document.querySelector(".popup__submit-button_confirmation"),e}return e=a,(n=[{key:"setSubmitAction",value:function(t){this._handleSubmitCallback=t}},{key:"setEventListeners",value:function(){var t=this;j(R(a.prototype),"setEventListeners",this).call(this),this._confirmationButton.addEventListener("click",(function(){t._handleSubmitCallback(t)}))}}])&&P(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),a}(s);function q(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var U=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.renderer=r,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"renderSection",value:function(t){var e=this;t.reverse().forEach((function(t){e.renderer(t)}))}},{key:"addItem",value:function(t){this._container.prepend(t)}}])&&q(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function x(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var V=function(){function t(e){var n=e.profileTitleSelector,r=e.profileSubtitleSelector,o=e.profileAvatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._profileTitle=document.querySelector(n),this._profileSubtitle=document.querySelector(r),this._profileAvatar=document.querySelector(o)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._profileTitle.textContent,description:this._profileSubtitle.textContent}}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.description,r=t.avatarLink;this._profileTitle.textContent=e,this._profileSubtitle.textContent=n,this._profileAvatar.setAttribute("src",r),this._profileAvatar.setAttribute("alt",e)}},{key:"editAvatar",value:function(t){var e=t.name,n=t.avatarLink;this._profileAvatar.setAttribute("src",n),this._profileAvatar.setAttribute("alt",e)}},{key:"editUserInfo",value:function(t){var e=t.name,n=t.description;this._profileTitle.textContent=e,this._profileSubtitle.textContent=n}}])&&x(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function D(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){u=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(t,e)||function(t,e){if(t){if("string"==typeof t)return F(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?F(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var N=document.querySelector(".profile"),J=N.querySelector(".profile__edit-button"),G=N.querySelector(".profile__add-button"),H=document.querySelector(".profile__avatar-overlay"),M=null,z={};function $(t,e,n){Q.open(t,e,n)}var K,Q=new O(".popup_photo"),W=new T(".popup_confirmation"),X=new U({items:r,renderer:function(t){var e,n=(e=new i(t,M,".photo-cards-template",$,(function(t){W.open(),W.setSubmitAction((function(){nt.deleteCard(t.cardId).then((function(){e.removeCard(),W.close()})).catch((function(t){console.log(t)}))}))}),(function(t){nt.addLike(t.cardId).then((function(t){e.toggleLike(t)})).catch((function(t){console.log(t)}))}),(function(t){nt.removeLike(t.cardId).then((function(t){e.toggleLike(t)})).catch((function(t){console.log(t)}))}))).generatePhotoCard();X.addItem(n)}},".photo-cards__grid"),Y=new V({profileTitleSelector:".profile__title",profileSubtitleSelector:".profile__subtitle",profileAvatarSelector:".profile__avatar"}),Z=new v({popupSelector:".popup_profile",handleFormSubmition:function(t){Z.formSending(!0),nt.editUserInfo({name:t.nameField,description:t.descriptionField}).then((function(t){Y.editUserInfo({name:t.name,description:t.about}),Z.close()})).catch((function(t){console.log(t)})).finally((function(){Z.formSending(!1)}))}}),tt=new v({popupSelector:".popup_card",handleFormSubmition:function(t){tt.formSending(!0),nt.addNewCard({name:t.name,link:t.link}).then((function(t){X.renderer(t),tt.close()})).catch((function(t){console.log(t)})).finally((function(){tt.formSending(!1)}))}}),et=new v({popupSelector:".popup_avatar",handleFormSubmition:function(t){et.formSending(!0),nt.editAvatar(t["avatar-link"]).then((function(t){Y.editAvatar({name:t.name,avatarLink:t.avatar}),et.close()})).catch((function(t){console.log(t)})).finally((function(){et.formSending(!1)}))}}),nt=new n({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-44",headers:{authorization:"8848ee4a-47e5-4bf2-b34e-b286c4490bd6","Content-Type":"application/json"}});Promise.all([nt.getUserInfo(),nt.getInitialCards()]).then((function(t){var e=D(t,2),n=e[0],r=e[1];M=n._id,Y.setUserInfo({name:n.name,description:n.about,avatarLink:n.avatar}),X.renderSection(r)})).catch((function(t){var e=D(t,1)[0];console.log(e)})),Q.setEventListeners(),tt.setEventListeners(),Z.setEventListeners(),et.setEventListeners(),W.setEventListeners(),J.addEventListener("click",(function(){var t=Y.getUserInfo();Z.open(t),z.popupProfileForm.resetValidation()})),G.addEventListener("click",(function(){tt.open({place:"",link:""}),z.popupCardForm.resetValidation()})),H.addEventListener("click",(function(){et.open({"avatar-link":""}),z.popupAvatarForm.resetValidation()})),K={formSelector:".popup__container",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(K.formSelector)).forEach((function(t){var e=new u(K,t),n=t.getAttribute("name");z[n]=e,e.enableValidation()}))})();
import { genirationTotalObject } from './data.js';

const COUNT_OBJECT = 10;

const arrayOfObjects = Array.from(
  { length: COUNT_OBJECT },
  genirationTotalObject
);

const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('article');

function createPopupAvatar(objectIndex, popup) {
  popup.querySelector('.popup__avatar').src =
    arrayOfObjects[objectIndex].author.avatar;
}

function createPopupTitle(objectIndex, popup) {
  popup.querySelector('.popup__title').textContent =
    arrayOfObjects[objectIndex].offer.title;
}

function createPopupAddress(objectIndex, popup) {
  popup.querySelector('.popup__text--address').textContent =
    arrayOfObjects[objectIndex].offer.address;
}

function createPopupPrice(objectIndex, popup) {
  popup
    .querySelector('.popup__text--price')
    .insertAdjacentHTML('afterbegin', arrayOfObjects[objectIndex].offer.price);
}

const type = {
  float: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

function createPopupType(objectIndex, popup) {
  popup.querySelector('.popup__type').textContent =
    type[arrayOfObjects[objectIndex].offer.type];
}

function createPopupСapacity(objectIndex, popup) {
  popup.querySelector(
    '.popup__text--capacity'
  ).textContent = `${arrayOfObjects[objectIndex].offer.rooms} комнаты комнаты для ${arrayOfObjects[objectIndex].offer.guests} гостей`;
}

function createPopupTime(objectIndex, popup) {
  popup.querySelector(
    '.popup__text--time'
  ).textContent = `Заезд после ${arrayOfObjects[objectIndex].offer.checkin}, выезд до ${arrayOfObjects[objectIndex].offer.checkout}`;
}

function createPopupFeatures(objectIndex, popup) {
  const features = popup.querySelectorAll('.popup__feature');

  features.forEach((featureElement) => {
    const isNeed = arrayOfObjects[objectIndex].offer.features.some((element) =>
      featureElement.classList.contains(`popup__feature--${element}`)
    );

    if (!isNeed) {
      featureElement.remove();
    }
  });
}

function createPopupDescription(objectIndex, popup) {
  popup.querySelector('.popup__description').textContent =
    arrayOfObjects[objectIndex].offer.description;
}

function createPopupPhotos(objectIndex, popup) {
  popup.querySelector('.popup__photo').src =
    arrayOfObjects[objectIndex].offer.photos;
}

function renderPopup(objectIndex) {
  const popup = cardTemplate.cloneNode(true);
  createPopupAvatar(objectIndex, popup);
  createPopupTitle(objectIndex, popup);
  createPopupAddress(objectIndex, popup);
  createPopupPrice(objectIndex, popup);
  createPopupType(objectIndex, popup);
  createPopupСapacity(objectIndex, popup);
  createPopupTime(objectIndex, popup);
  createPopupFeatures(objectIndex, popup);
  createPopupDescription(objectIndex, popup);
  createPopupPhotos(objectIndex, popup);
  return popup;
}

function getArrayPopup() {
  const array = [];
  for (let i = 0; i < arrayOfObjects.length; i++) {
    renderPopup(i);
    array.push(renderPopup(i));
  }
  return array;
}

const arrayPopup = getArrayPopup();

export {arrayPopup, arrayOfObjects };

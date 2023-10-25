import { createSimilarAds } from './map.js';

const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('article');

function createPopupAvatar(objects, objectIndex, popup) {
  popup.querySelector('.popup__avatar').src =
  objects[objectIndex].author.avatar;
}

function createPopupTitle(objects, objectIndex, popup) {
  popup.querySelector('.popup__title').textContent =
  objects[objectIndex].offer.title;
}

function createPopupAddress(objects, objectIndex, popup) {
  popup.querySelector('.popup__text--address').textContent =
  objects[objectIndex].offer.address;
}

function createPopupPrice(objects, objectIndex, popup) {
  popup
    .querySelector('.popup__text--price')
    .insertAdjacentHTML('afterbegin', objects[objectIndex].offer.price);
}

const type = {
  float: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

function createPopupType(objects, objectIndex, popup) {
  popup.querySelector('.popup__type').textContent =
    type[objects[objectIndex].offer.type];
}

function createPopupСapacity(objects, objectIndex, popup) {
  popup.querySelector(
    '.popup__text--capacity'
  ).textContent = `${objects[objectIndex].offer.rooms} комнаты комнаты для ${objects[objectIndex].offer.guests} гостей`;
}

function createPopupTime(objects, objectIndex, popup) {
  popup.querySelector(
    '.popup__text--time'
  ).textContent = `Заезд после ${objects[objectIndex].offer.checkin}, выезд до ${objects[objectIndex].offer.checkout}`;
}

function createPopupFeatures(objects, objectIndex, popup) {
  if (objects[objectIndex].offer.features) {
    const features = popup.querySelectorAll('.popup__feature');

    features.forEach((featureElement) => {
      const isNeed = objects[objectIndex].offer.features.some((element) =>
        featureElement.classList.contains(`popup__feature--${element}`)
      );

      if (!isNeed) {
        featureElement.remove();
      }
    });
  }
}

function createPopupDescription(objects, objectIndex, popup) {
  popup.querySelector('.popup__description').textContent =
  objects[objectIndex].offer.description;
}

function createPopupPhotos(objects, objectIndex, popup) {
  popup.querySelector('.popup__photo').src =
  objects[objectIndex].offer.photos;
}

function renderPopup(objects, objectIndex) {
  const popup = cardTemplate.cloneNode(true);
  createPopupAvatar(objects, objectIndex, popup);
  createPopupTitle(objects, objectIndex, popup);
  createPopupAddress(objects, objectIndex, popup);
  createPopupPrice(objects, objectIndex, popup);
  createPopupType(objects, objectIndex, popup);
  createPopupСapacity(objects, objectIndex, popup);
  createPopupTime(objects, objectIndex, popup);
  createPopupFeatures(objects, objectIndex, popup);
  createPopupDescription(objects, objectIndex, popup);
  createPopupPhotos(objects, objectIndex, popup);
  return popup;
}

function getArrayPopup(objects) {
  const obj = objects.slice(0, 10);
  const arrayPopup = [];
  for (let i = 0; i < obj.length; i++) {
    arrayPopup.push(renderPopup(obj, i));
  }

  createSimilarAds(arrayPopup, obj);
}

export { getArrayPopup };

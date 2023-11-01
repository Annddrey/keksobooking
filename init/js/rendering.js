import { creatingLayer } from './map.js';

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
  flat: 'Квартира',
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
  ).textContent = `Кол-во комнат - ${objects[objectIndex].offer.rooms}; Кол-во гостей - ${objects[objectIndex].offer.guests}`;
}

function createPopupTime(objects, objectIndex, popup) {
  popup.querySelector(
    '.popup__text--time'
  ).textContent = `Заезд после ${objects[objectIndex].offer.checkin}, выезд до ${objects[objectIndex].offer.checkout}`;
}

function createPopupFeatures(objects, objectIndex, popup) {
  const features = popup.querySelectorAll('.popup__feature');

  if (objects[objectIndex].offer.features) {
    features.forEach((featureElement) => {
      const isNeed = objects[objectIndex].offer.features.some((element) =>
        featureElement.classList.contains(`popup__feature--${element}`)
      );

      if (!isNeed) {
        featureElement.remove();
      }
    });
  } else {
    popup.querySelector('.popup__features').remove();
  }
}

function createPopupDescription(objects, objectIndex, popup) {
  popup.querySelector('.popup__description').textContent =
  objects[objectIndex].offer.description;
}

function createPopupPhotos(objects, objectIndex, popup) {
  const popupPhotos = popup.querySelector('.popup__photos');
  objects[objectIndex].offer.photos.forEach((element) => {
    const photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.setAttribute('width', '45');
    photo.setAttribute('height', '40');
    photo.setAttribute('alt', 'Фотография жилья');
    photo.setAttribute('src', element);
    popupPhotos.append(photo);
  });
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

  popup.querySelector('.popup__photo').remove();
  if (objects[objectIndex].offer.photos) {
    createPopupPhotos(objects, objectIndex, popup);
  }

  return popup;
}

function addToMapPoints(objects) {
  const obj = objects.slice(0, 10);
  const arrayPopup = [];
  for (let i = 0; i < obj.length; i++) {
    arrayPopup.push(renderPopup(obj, i));
  }

  creatingLayer(arrayPopup, obj);
}

export { addToMapPoints };

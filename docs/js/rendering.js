import { createLayer } from './map.js';

const CONFIG = {
  MAX_CARDS: 10,
  DEFAULT_AVATAR: 'img/avatars/default.png',
  PHOTO_SIZE: { width: 45, height: 40 }
};

const HOUSING_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const SELECTORS = {
  CARD_TEMPLATE: '#card',
  AVATAR: '.popup__avatar',
  TITLE: '.popup__title',
  ADDRESS: '.popup__text--address',
  PRICE: '.popup__text--price',
  TYPE: '.popup__type',
  CAPACITY: '.popup__text--capacity',
  TIME: '.popup__text--time',
  FEATURES: '.popup__features',
  FEATURE_ITEM: '.popup__feature',
  DESCRIPTION: '.popup__description',
  PHOTOS: '.popup__photos',
  PHOTO: '.popup__photo'
};

const cardTemplate = document
  .querySelector(SELECTORS.CARD_TEMPLATE)
  ?.content.querySelector('article');

function isValidCard(object) {
  return object &&
         typeof object === 'object' &&
         object.offer &&
         object.author &&
         typeof object.offer === 'object' &&
         typeof object.author === 'object';
}

function getSafeValue(value, fallback = '') {
  return value ?? fallback;
}

function safeQuerySelector(element, selector) {
  const foundElement = element.querySelector(selector);
  if (!foundElement) {
    console.warn(`Element not found: ${selector}`);
  }
  return foundElement;
}

function setElementContent(element, content, fallback = '') {
  if (!element) return false;

  const safeContent = getSafeValue(content, fallback);
  if (safeContent) {
    element.textContent = safeContent;
    return true;
  } else {
    element.remove();
    return false;
  }
}

function setImageSource(imgElement, src, fallbackSrc = CONFIG.DEFAULT_AVATAR) {
  if (!imgElement) return false;

  const safeSrc = getSafeValue(src, fallbackSrc);
  if (safeSrc) {
    imgElement.src = safeSrc;
    return true;
  } else {
    imgElement.remove();
    return false;
  }
}

function createPopupAvatar(object, popup) {
  const avatarElement = safeQuerySelector(popup, SELECTORS.AVATAR);
  setImageSource(avatarElement, object.author?.avatar);
}

function createPopupTitle(object, popup) {
  const titleElement = safeQuerySelector(popup, SELECTORS.TITLE);
  setElementContent(titleElement, object.offer?.title, 'Без названия');
}

function createPopupAddress(object, popup) {
  const addressElement = safeQuerySelector(popup, SELECTORS.ADDRESS);
  setElementContent(addressElement, object.offer?.address, 'Адрес не указан');
}

function createPopupPrice(object, popup) {
  const priceElement = safeQuerySelector(popup, SELECTORS.PRICE);
  if (!priceElement) return;

  const price = object.offer?.price;
  if (price && Number.isFinite(price)) {
    priceElement.textContent = `${price} ₽/ночь`;
  } else {
    priceElement.remove();
  }
}

function createPopupType(object, popup) {
  const typeElement = safeQuerySelector(popup, SELECTORS.TYPE);
  const offerType = object.offer?.type;
  const typeText = HOUSING_TYPES[offerType] || 'Неизвестный тип';
  setElementContent(typeElement, typeText);
}

function createPopupCapacity(object, popup) {
  const capacityElement = safeQuerySelector(popup, SELECTORS.CAPACITY);
  if (!capacityElement) return;

  const rooms = object.offer?.rooms;
  const guests = object.offer?.guests;

  if (rooms != null && guests != null) {
    capacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    capacityElement.remove();
  }
}

function createPopupTime(object, popup) {
  const timeElement = safeQuerySelector(popup, SELECTORS.TIME);
  if (!timeElement) return;

  const checkin = object.offer?.checkin;
  const checkout = object.offer?.checkout;

  if (checkin && checkout) {
    timeElement.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    timeElement.remove();
  }
}

function createPopupFeatures(object, popup) {
  const featuresContainer = safeQuerySelector(popup, SELECTORS.FEATURES);
  if (!featuresContainer) return;

  const features = object.offer?.features;

  if (!features || !Array.isArray(features) || features.length === 0) {
    featuresContainer.remove();
    return;
  }

  const featuresHTML = features
    .map(feature =>
      `<li class="popup__feature popup__feature--${feature}"></li>`
    )
    .join('');

  featuresContainer.innerHTML = featuresHTML;
}

function createPopupDescription(object, popup) {
  const descriptionElement = safeQuerySelector(popup, SELECTORS.DESCRIPTION);
  setElementContent(descriptionElement, object.offer?.description);
}

function createPopupPhotos(object, popup) {
  const photosContainer = safeQuerySelector(popup, SELECTORS.PHOTOS);
  if (!photosContainer) return;

  const photos = object.offer?.photos;

  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    photosContainer.remove();
    return;
  }

  const photoTemplate = safeQuerySelector(popup, SELECTORS.PHOTO);
  if (photoTemplate) {
    photoTemplate.remove();
  }

  photos.forEach(photoSrc => {
    if (typeof photoSrc === 'string' && photoSrc.trim()) {
      const photo = document.createElement('img');
      photo.className = 'popup__photo';
      photo.width = CONFIG.PHOTO_SIZE.width;
      photo.height = CONFIG.PHOTO_SIZE.height;
      photo.alt = 'Фотография жилья';
      photo.loading = 'lazy';

      photo.onerror = () => { photo.style.display = 'none'; };
      photo.src = photoSrc;

      photosContainer.appendChild(photo);
    }
  });
}

function renderPopup(object) {
  if (!cardTemplate) {
    console.error('Card template not found');
    return null;
  }

  if (!isValidCard(object)) {
    console.error('Invalid card object:', object);
    return null;
  }

  const popup = cardTemplate.cloneNode(true);

  const contentCreators = [
    createPopupAvatar,
    createPopupTitle,
    createPopupAddress,
    createPopupPrice,
    createPopupType,
    createPopupCapacity,
    createPopupTime,
    createPopupFeatures,
    createPopupDescription,
    createPopupPhotos
  ];

  contentCreators.forEach(creator => {
    try {
      creator(object, popup);
    } catch (error) {
      console.error('Error in content creator:', creator.name, error);
    }
  });

  return popup;
}


function addToMapPoints(cards) {
  if (!Array.isArray(cards)) {
    console.error('Cards should be an array');
    return;
  }

  const validCards = cards
    .slice(0, CONFIG.MAX_CARDS)
    .filter(isValidCard);

  const popups = validCards
    .map(renderPopup)
    .filter(popup => popup !== null);

  createLayer(popups, validCards);
}

export { addToMapPoints, isValidCard };

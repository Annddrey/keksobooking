import { getRandomPositiveInteger, getRandomGeolocation } from './util.js';

const avatarAdres = [
  '01',
  '05',
  '10',
  '02',
  '03',
  '11',
  '04',
  '07',
  '08',
  '15',
];

const titleOffer = [
  'Уютные апартаменты',
  'Минималистичный интерьер',
  'Отдых на природе',
  'Красивый вид из окна',
  'Хорошая инфраструктура',
  'Хит продаж',
  'Лучший выбор',
  'Семейный номер',
];

const chek = ['12:00', '13:00', '14:00'];

const type = ['palace', 'float', 'hotel', 'bungalow', 'house'];

const featur = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const description = [
  'Кстати, диаграммы связей лишь добавляют фракционных разногласий и в равной степени предоставлены сами себе.',
  'Безусловно, перспективное планирование однозначно фиксирует необходимость стандартных подходов.',
  'Безусловно, убеждённость некоторых оппонентов требует анализа соответствующих условий активизации',
  'Как принято считать, многие известные личности своевременно верифицированы.',
  'Являясь всего лишь частью общей картины, ключевые особенности структуры проекта могут быть призваны к ответу.',
  'Являясь всего лишь частью общей картины, явные признаки победы институционализации будут призваны к ответу.',
];

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// Object geniration - author

function getIndexAvatarAdres() {
  return getRandomPositiveInteger(0, avatarAdres.length - 1);
}

function genirationAvater() {
  const index = getIndexAvatarAdres();
  const numberAvatar = avatarAdres[index];
  avatarAdres.splice(index, 1);
  return { avatar: `img/avatars/user${numberAvatar}.png` };
}

// Object geniration - location

function generatorLocationObject() {
  return {
    lat: getRandomGeolocation(35.65, 35.7, 5),
    lng: getRandomGeolocation(139.7, 139.8, 5),
  };
}

// Object geniration - offer
function randOfferTitle() {
  return titleOffer[getRandomPositiveInteger(0, 7)];
}

function generatorType() {
  return type[getRandomPositiveInteger(0, 4)];
}

function getCountRooms() {
  return getRandomPositiveInteger(1, 4);
}

function getCountGuests() {
  return getRandomPositiveInteger(1, 5);
}

function getChek() {
  return chek[getRandomPositiveInteger(0, 2)];
}

function getFeatures() {
  const COUNT_ELEMENT = getRandomPositiveInteger(1, 6);
  const copyFeatur = featur.slice();
  return Array.from({ length: COUNT_ELEMENT }, () => {
    const index = getRandomPositiveInteger(0, copyFeatur.length - 1);
    const element = copyFeatur[index];
    copyFeatur.splice(index, 1);
    return element;
  });
}

function getDescription() {
  return description[getRandomPositiveInteger(0, description.length - 1)];
}

function getPhotos() {
  return photos[getRandomPositiveInteger(0, photos.length - 1)];
}

function generatorOfferObject(location) {
  return {
    title: randOfferTitle(),
    address: `${location.lat.toString()}, ${location.lng.toString()}`,
    price: getRandomPositiveInteger(10000, 100000),
    type: generatorType(),
    rooms: getCountRooms(),
    guests: getCountGuests(),
    checkin: getChek(),
    checkout: getChek(),
    features: getFeatures(),
    description: getDescription(),
    photos: getPhotos(),
  };
}

// Array of objects

const genirationTotalObject = () => {
  const location = generatorLocationObject();
  return {
    author: genirationAvater(),
    offer: generatorOfferObject(location),
    location: location,
  };
};

export { genirationTotalObject };
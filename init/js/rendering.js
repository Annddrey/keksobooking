import { genirationTotalObject } from "./data.js";

const cardTemplate = document
  .querySelector("#card")
  .content.querySelector("article");

const ArrayOfObjects = Array.from({ length: 10 }, genirationTotalObject);

const popup = cardTemplate.cloneNode(true);

function createPopupAvatar(objectIndex) {
  popup.querySelector(".popup__avatar").src =
    ArrayOfObjects[objectIndex].author.avatar;
}

function createPopupTitle(objectIndex) {
  popup.querySelector(".popup__title").textContent =
    ArrayOfObjects[objectIndex].offer.title;
}

function createPopupAddress(objectIndex) {
  popup.querySelector(".popup__text--address").textContent =
    ArrayOfObjects[objectIndex].offer.address;
}

function createPopupPrice(objectIndex) {
  popup
    .querySelector(".popup__text--price")
    .insertAdjacentHTML("afterbegin", ArrayOfObjects[objectIndex].offer.price);
}

const type = {
  float: "Квартира",
  bungalow: "Бунгало",
  house: "Дом",
  palace: "Дворец",
  hotel: "Отель",
};

function createPopupType(objectIndex) {
  popup.querySelector(".popup__type").textContent =
    type[ArrayOfObjects[objectIndex].offer.type];
}

function createPopupСapacity(objectIndex) {
  popup.querySelector(
    ".popup__text--capacity"
  ).textContent = `${ArrayOfObjects[objectIndex].offer.rooms} комнаты комнаты для ${ArrayOfObjects[objectIndex].offer.guests} гостей`;
}

function createPopupTime(objectIndex) {
  popup.querySelector(
    ".popup__text--time"
  ).textContent = `Заезд после ${ArrayOfObjects[objectIndex].offer.checkin}, выезд до ${ArrayOfObjects[objectIndex].offer.checkout}`;
}

function createPopupFeatures(objectIndex) {
  const features = popup.querySelectorAll(".popup__feature");

  features.forEach((featureElement) => {
    const isNeed = ArrayOfObjects[objectIndex].offer.features.some((element) =>
      featureElement.classList.contains(`popup__feature--${element}`)
    );

    if (!isNeed) {
      featureElement.remove();
    }
  });
}

function createPopupDescription(objectIndex) {
  popup.querySelector(".popup__description").textContent =
    ArrayOfObjects[objectIndex].offer.description;
}

function createPopupPhotos(objectIndex) {
  popup.querySelector(".popup__photo").src =
    ArrayOfObjects[objectIndex].offer.photos;
}

function renderPopup(objectIndex) {
  createPopupAvatar(objectIndex);
  createPopupTitle(objectIndex);
  createPopupAddress(objectIndex);
  createPopupPrice(objectIndex);
  createPopupType(objectIndex);
  createPopupСapacity(objectIndex);
  createPopupTime(objectIndex);
  createPopupFeatures(objectIndex);
  createPopupDescription(objectIndex);
  createPopupPhotos(objectIndex);
}

renderPopup(0);
console.log(popup.children);
let mapConvas = document.querySelector("#map-canvas");
mapConvas.appendChild(popup);

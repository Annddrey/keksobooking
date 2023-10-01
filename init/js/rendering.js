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
createPopupAvatar(0);

function createPopupTitle(objectIndex) {
  popup.querySelector(".popup__title").textContent =
    ArrayOfObjects[objectIndex].offer.title;
}
createPopupTitle(0);

function createPopupAddress(objectIndex) {
  popup.querySelector(".popup__text--address").textContent =
    ArrayOfObjects[objectIndex].offer.address;
}
createPopupAddress(0);

function createPopupPrice(objectIndex) {
  popup.querySelector(".popup__text--price").textContent =
    ArrayOfObjects[objectIndex].offer.price;
}
createPopupPrice(0);

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
createPopupType(0);

function createPopupСapacity(objectIndex) {
  popup.querySelector(
    ".popup__text--capacity"
  ).textContent = `${ArrayOfObjects[objectIndex].offer.rooms} комнаты комнаты для ${ArrayOfObjects[objectIndex].offer.guests} гостей`;
}
createPopupСapacity(0);

function createPopupTime(objectIndex) {
  popup.querySelector(
    ".popup__text--time"
  ).textContent = `Заезд после ${ArrayOfObjects[objectIndex].offer.checkin}, выезд до ${ArrayOfObjects[objectIndex].offer.checkout}`;
}
createPopupTime(0);

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
createPopupFeatures(0);

function createPopupDescription(objectIndex) {
  popup.querySelector(".popup__description").textContent =
    ArrayOfObjects[objectIndex].offer.description;
}
createPopupDescription(0);

function createPopupPhotos(objectIndex) {
  popup.querySelector(".popup__photos").src =
    ArrayOfObjects[objectIndex].offer.photos;
}
createPopupPhotos(0);

console.log(popup.children[0].src);
console.log(popup.children[1].textContent);
console.log(popup.children[2].textContent);
console.log(popup.children[3].textContent);
console.log(popup.children[4].textContent);
console.log(popup.children[5].textContent);
console.log(popup.children[6].textContent);
console.log(popup.children[7].children);
console.log(popup.children[8].textContent);
console.log(popup.children[9].src);

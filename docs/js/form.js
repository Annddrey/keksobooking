import { sendData } from "./load.js";
import { mainMarker, DEFAULT_POSITION, markerGroup } from "./map.js";

const adForm = document.querySelector(".ad-form");
const mapFilters = document.querySelector(".map__filters");

function blockDisabled(form) {
  const classForm = form.classList[0];
  form.classList.toggle(`${classForm}--disabled`);

  if (form.classList.contains(`${classForm}--disabled`)) {
    addDisabled(form, `${classForm} > *`, true);
  } else {
    addDisabled(form, `${classForm} > *`, false);
  }
}

function addDisabled(form, selector, flag) {
  const elements = form.querySelectorAll(`.${selector}`);
  for (const element of elements) {
    element.disabled = flag;
  }
}

function activeTogler(...forms) {
  forms.forEach((form) => blockDisabled(form));
}

// Validation

const formPristine = new Pristine(adForm, {
  classTo: "ad-form__element",
  errorClass: "ad-form__element--invalid",
  successClass: "ad-form__element--valid",
  errorTextParent: "ad-form__element",
  errorTextTag: "span",
  errorTextClass: "ad-form__error",
});

const inputAdres = document.querySelector("#address");

inputAdres.addEventListener("focus", (evt) =>
  formPristine.validate(evt.target)
);

// Guest validation
const inputGustes = adForm.querySelector("#capacity");
const InputRums = adForm.querySelector("#room_number");

const inHouse = {
  1: 1,
  2: 2,
  3: 3,
  100: 0,
};

function getMaxNumberGustes(value) {
  if (InputRums.value !== "100") {
    return (
      parseInt(value, 10) <= inHouse[InputRums.value] && parseInt(value, 10) > 0
    );
  } else {
    return parseInt(value, 10) === 0;
  }
}

function getErrorTextInputGustes() {
  return `Максимальное кол-во гостей ${inHouse[InputRums.value]}`;
}

formPristine.addValidator(
  inputGustes,
  getMaxNumberGustes,
  getErrorTextInputGustes
);

inputGustes.addEventListener("change", () => {
  formPristine.validate(inputGustes);
});

InputRums.addEventListener("change", () => {
  formPristine.validate(inputGustes);
});

// Price vlidation

const InputPrice = adForm.querySelector("#price");
const InputType = adForm.querySelector("#type");

const typeOfHousing = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

function getMinPrice() {
  InputPrice.placeholder = typeOfHousing[InputType.value];
  InputPrice.setAttribute("min", typeOfHousing[InputType.value]);
}

InputType.addEventListener("change", getMinPrice);

function getErrorTextInputPrice() {
  return `Минимальная цена ${typeOfHousing[InputType.value]}`;
}

function funValidationPrice(value) {
  return parseInt(value, 10) >= typeOfHousing[InputType.value];
}

formPristine.addValidator(
  InputPrice,
  funValidationPrice,
  getErrorTextInputPrice
);

InputPrice.addEventListener("change", () => {
  formPristine.validate(InputPrice);
});

InputType.addEventListener("change", () => {
  formPristine.validate(InputPrice);
});

// Validation timein and timeout

const Inputtimein = adForm.querySelector("#timein");
const Inputtimeout = adForm.querySelector("#timeout");

Inputtimein.addEventListener("change", () => {
  Inputtimeout.value = Inputtimein.value;
});

Inputtimeout.addEventListener("change", () => {
  Inputtimein.value = Inputtimeout.value;
});

// Send form

function blockSubmitButton() {
  const submitButton = adForm.querySelector(".ad-form__submit");
  submitButton.disabled = true;
  submitButton.textContent = "Отправка...";
}

function onblockSubmitButton() {
  const submitButton = adForm.querySelector(".ad-form__submit");
  submitButton.disabled = false;
  submitButton.textContent = "Опубликовать";
}

function resaulMessage(idTemplate) {
  const successTemplate = document
    .querySelector(`#${idTemplate}`)
    .content.querySelector(`.${idTemplate}`);
  const message = successTemplate.cloneNode(true);

  document.body.append(message);

  document.body.addEventListener("click", () => message.remove());

  document.body.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      message.remove();
    }
  });
}

function publishingAnAd() {
  adForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const isValid = formPristine.validate();
    if (isValid) {
      blockSubmitButton();

      sendData(
        () => {
          if (document.querySelector(".leaflet-popup")) {
            document.querySelector(".leaflet-popup").remove();
          }
          evt.target.reset();
          mapFilters.reset();
          mainMarker.setLatLng(DEFAULT_POSITION);
          onblockSubmitButton();
          resaulMessage("success");
        },
        () => {
          onblockSubmitButton();
          resaulMessage("error");
        },
        new FormData(evt.target)
      );
    }
  });
}

// Reset form

const resetButton = document.querySelector(".ad-form__reset");

function onClickReset(evt) {
  evt.preventDefault();

  if (document.querySelector(".leaflet-popup")) {
    document.querySelector(".leaflet-popup").remove();
  }

  adForm.reset();
  mapFilters.reset();
  markerGroup.clearLayers();
  mainMarker.setLatLng(DEFAULT_POSITION);
}

function resetForm(data, cb) {
  resetButton.addEventListener("click", (evt) => {
    onClickReset(evt);
    cb(data);
  });
}
resetButton.addEventListener("click", onClickReset);

export { activeTogler, formPristine, publishingAnAd, resetForm };

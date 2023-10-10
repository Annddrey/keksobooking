const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

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

function activeTogler() {
  blockDisabled(adForm);
  blockDisabled(mapFilters);
}

// Validation

const formPristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error'
});

// Guest validation
const inputGustes = adForm.querySelector('#capacity');
const InputRums = adForm.querySelector('#room_number');

const inHouse = {
  '1': 1,
  '2': 2,
  '3': 3,
  '100': 0
};

function getMaxNumberGustes(value) {
  return parseInt(value, 10) <= inHouse[InputRums.value];
}

function getErrorTextInputGustes() {
  return `Максимальное кол-во гостей: ${inHouse[InputRums.value]}`;
}

formPristine.addValidator(inputGustes, getMaxNumberGustes, getErrorTextInputGustes);

inputGustes.addEventListener('change', () => {
  formPristine.validate(inputGustes);
});

InputRums.addEventListener('change', () => {
  formPristine.validate(inputGustes);
});

// Price vlidation

const InputPrice = adForm.querySelector('#price');
const InputType = adForm.querySelector('#type');

const typeOfHousing = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

function getMinPrice() {
  InputPrice.placeholder = typeOfHousing[InputType.value];
  InputPrice.setAttribute('min', typeOfHousing[InputType.value]);
}

InputType.addEventListener('change', getMinPrice);

function getErrorTextInputPrice() {
  return `Минимальная цена ${typeOfHousing[InputType.value]}`;
}

function funValidationPrice(value) {
  return parseInt(value, 10) >= typeOfHousing[InputType.value];
}

formPristine.addValidator(InputPrice, funValidationPrice, getErrorTextInputPrice);

InputPrice.addEventListener('change', () => {
  formPristine.validate(InputPrice);
});

InputType.addEventListener('change', () => {
  formPristine.validate(InputPrice);
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formPristine.validate();
});

// Validation timein and time out

const Inputtimein = adForm.querySelector('#timein');
const Inputtimeout = adForm.querySelector('#timeout');

Inputtimein.addEventListener('change', () => {
  Inputtimeout.value = Inputtimein.value;
});

Inputtimeout.addEventListener('change', () => {
  Inputtimein.value = Inputtimeout.value;
});

export { activeTogler };

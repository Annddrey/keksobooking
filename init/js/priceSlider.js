import { formPristine } from './form.js';

const priceSlider = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000
  },
  start: 1000,
  connect: 'lower',
  format: {
    to: function(value) {
      return value.toFixed(0);
    },
    from: function(value) {
      return parseFloat(value);
    }
  }
});

priceField.addEventListener('input', () => {
  priceSlider.noUiSlider.set(priceField.value);
});

priceSlider.noUiSlider.on('update', () => {
  priceField.value = priceSlider.noUiSlider.get();
  formPristine.validate(priceField);
});


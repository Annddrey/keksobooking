import {addToMapPoints} from './rendering.js';
import { getData } from './load.js';
import {showAlert, debounce} from './util.js';
import { publishingAnAd, activeTogler, resetForm } from './form.js';
import './priceSlider.js';
import './adFilter.js';
import { adsFilter } from './adFilter.js';

getData(
  (data) => {
    addToMapPoints(data);
    activeTogler(document.querySelector('.map__filters'));
    adsFilter(data, debounce(addToMapPoints));
    resetForm(data, addToMapPoints);
  },  showAlert);

publishingAnAd();


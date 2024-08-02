import { publishingAnAd, activeTogler, resetForm } from './form.js';
import {addToMapPoints} from './rendering.js';
import {showAlert, debounce} from './util.js';
import { adsFilter } from './adsFilter.js';
import { getData } from './load.js';
import './priceSlider.js';
import './adsFilter.js';
import './formPhotos.js';

getData(
  (data) => {
    addToMapPoints(data);
    activeTogler(document.querySelector('.map__filters'));
    adsFilter(data, debounce(addToMapPoints));
    resetForm(data, addToMapPoints);
  },  showAlert);

publishingAnAd();


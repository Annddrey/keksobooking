import {setPopups} from './rendering.js';
import { getData } from './load.js';
import {showAlert} from './util.js';
import { publishingAnAd } from './form.js';
import './priceSlider.js';

getData(setPopups, showAlert);

publishingAnAd();

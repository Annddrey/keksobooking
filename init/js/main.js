import './priceSlider.js';
import {getArrayPopup} from './rendering.js';
import { loadingSimilarAds } from './load.js';
import {showAlert} from './util.js';

loadingSimilarAds(getArrayPopup, showAlert);

import { getArrayPopup } from './rendering.js';
import { activeTogler } from './form.js';

activeTogler();

const EventLoadMap = function() {
  activeTogler();
};

const map = L.map('map-canvas').on('load', EventLoadMap).setView({
  lat: 35.68045,
  lng: 139.76897
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);



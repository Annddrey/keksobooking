import { arrayPopup, arrayOfObjects } from './rendering.js';
import { activeTogler, formPristine } from './form.js';

activeTogler();

const EventLoadMap = function() {
  activeTogler();
};

const map = L.map('map-canvas').on('load', EventLoadMap).setView({
  lat: 35.68045,
  lng: 139.76897
}, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

const mainMarker = L.marker({
  lat: 35.68045,
  lng: 139.76897
},
{
  draggable: true,
  icon: mainMarkerIcon
}
);

mainMarker.addTo(map);

const inputAdres = document.querySelector('#address');

mainMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  inputAdres.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

// Similar ads

const markerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function createMarkerPoint(object, index) {
  const {lat, lng} = object.location;

  const marker = L.marker(
    {
      lat: lat,
      lng: lng
    },
    {
      icon:markerIcon
    }
  );

  marker.addTo(map).bindPopup(arrayPopup[index]);
}

arrayOfObjects.forEach((object, index) => {
  createMarkerPoint(object, index);
});

// Price slider

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

priceSlider.noUiSlider.on('update', () => {
  priceField.value = priceSlider.noUiSlider.get();
  formPristine.validate(priceField);
});

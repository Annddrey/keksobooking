import { activeTogler, formPristine } from './form.js';

const DEFAULT_POSITION = {
  lat: 35.68045,
  lng: 139.76897
};

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

activeTogler(adForm, mapFilters);

const onMapLoad = function() {
  activeTogler(adForm);
};

const map = L.map('map-canvas').on('load', onMapLoad).setView(DEFAULT_POSITION, 13);

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

const mainMarker = L.marker(
  DEFAULT_POSITION,
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
  formPristine.validate(inputAdres);
});

// Similar ads

const markerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const markerGroup = L.layerGroup().addTo(map);

function createLayer(arrayPopup, similarAds) {

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

    marker.addTo(markerGroup).bindPopup(arrayPopup[index]);
  }

  similarAds.forEach((object, index) => {
    createMarkerPoint(object, index);
  });
}

export {createLayer, mainMarker, DEFAULT_POSITION, markerGroup};

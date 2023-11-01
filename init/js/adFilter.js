import { markerGroup } from './map.js';

const mapFilters = document.querySelector('.map__filters');

function typeFilter(ad) {
  const input = mapFilters.querySelector('#housing-type');
  if (input.value !== 'any') {
    return ad.offer.type === input.value;
  }

  return true;
}

function priceFilter(ad) {
  const input = mapFilters.querySelector('#housing-price');
  if (input.value === 'middle') {
    return ad.offer.price >= 10000 && ad.offer.price <= 50000;
  }
  if (input.value === 'low') {
    return ad.offer.price < 10000;
  }
  if (input.value === 'high') {
    return ad.offer.price > 50000;
  }

  return  true;
}

function numberRooms(ad) {
  const input = mapFilters.querySelector('#housing-rooms');
  if (input.value !== 'any') {
    return ad.offer.rooms === parseInt(input.value, 10);
  }

  return  true;
}

function numberGuests(ad) {
  const input = mapFilters.querySelector('#housing-guests');
  if (input.value !== 'any') {
    return ad.offer.guests === parseInt(input.value, 10);
  }

  return  true;
}

function featuresFilter(ad) {
  const checkboxes = mapFilters.querySelectorAll('[name=features]:checked');
  const valuesCheckeds = [];
  checkboxes.forEach((element) => {
    valuesCheckeds.push(element.value);
  });

  if (valuesCheckeds.length === 0) {
    return true;
  }

  let count = 0;

  if (ad.offer.features) {
    valuesCheckeds.forEach((el) => {
      if (ad.offer.features.includes(el)) {
        count++;
      }
    });
    const flag = count === valuesCheckeds.length;

    return flag;
  }
}

function sortingFilteredData(popupA, popupB) {
  const checkboxes = mapFilters.querySelectorAll('[name=features]:checked');

  const featuresA = popupA.offer.features;
  const featuresB = popupB.offer.features;

  if (featuresA && featuresB) {
    return (featuresA.length - checkboxes.length) - (featuresB.length - checkboxes.length);
  } else if (checkboxes.length === 0) {
    return featuresA === undefined ? -1 : 1;
  }
}

function makeFiltering(ads, cb) {
  markerGroup.clearLayers();

  const filteredData = ads
    .filter(typeFilter)
    .filter(priceFilter)
    .filter(numberRooms)
    .filter(numberGuests)
    .filter(featuresFilter);

  filteredData.sort(sortingFilteredData);

  cb(filteredData);
}

function adsFilter(ads, cb) {
  mapFilters.addEventListener('change', () => {
    makeFiltering(ads, cb);
  });
}


export {adsFilter};

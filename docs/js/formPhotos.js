const FILE_EXTENSION = ['jpg', 'jpeg', 'png', 'svg', 'gif'];

function isImage(file) {
  const fileName = file.name.toLowerCase();

  return FILE_EXTENSION.some((el) => fileName.endsWith(el));
}

// Avatar

const fieldFile = document.querySelector('#avatar');
const miniaturePhoto = document.querySelector('#miniaturePhoto');

fieldFile.addEventListener('change',() => {
  const file = fieldFile.files[0];

  if (isImage(file)) {
    miniaturePhoto.src = URL.createObjectURL(file);
  }
});

// Housing photos

const fieldHousingPhotos = document.querySelector('#images');
const photosContainer = document.querySelector('.ad-form__photo-container');
const photosTemplate = document.querySelector('.ad-form__photo');
photosTemplate.append(document.createElement('img'));


fieldHousingPhotos.addEventListener('change', () => {
  document.querySelector('.ad-form__photo').remove();

  for (let i = 0; fieldHousingPhotos.files.length; i++) {
    const file = fieldHousingPhotos.files[i];

    if (isImage(file)) {
      const photo = photosTemplate.cloneNode(true);
      photo.querySelector('img').setAttribute('src', URL.createObjectURL(file));
      photosContainer.append(photo);
    }
  }
});



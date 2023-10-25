function loadingSimilarAds(onSuccess, onError) {
  fetch('https://25.javascript.pges.academy/keksobooking/data')
    .then((response) => {
      if (response.ok){
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch((error) => onError(error));
}

export {loadingSimilarAds};

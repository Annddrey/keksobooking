function getData(onSuccess, onError) {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok){
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch(() => onError('Не получилось загрузить похожие объявления'));
}

function sendData(onSuccess, onError, body) {
  fetch('https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body
    })
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onError('Не удалось отправить данные формы');
      }
    })
    .catch(() => {
      onError('Не удалось отправить данные формы. Попробуйте еще раз.');
    });
}

export {getData, sendData};

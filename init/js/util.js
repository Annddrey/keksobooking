function showAlert(text) {
  const alert = document.createElement('div');
  alert.style.zIndex = 1000;
  alert.style.backgroundColor = '#f56b6bbd';
  alert.style.color = '#ffffff';
  alert.style.position = 'fixed';
  alert.style.padding = '10px';
  alert.style.top = 0;
  alert.style.left = '20%';
  alert.style.right = '20%';
  alert.style.margin = '0 auto';
  alert.style.textTransform = 'uppercase';
  alert.style.textAlign = 'center';
  alert.style.borderBottomLeftRadius = '6px';
  alert.style.borderBottomRightRadius = '6px';
  alert.textContent = text;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
}

function debounce(callback, timeout = 500) {
  let setTimeoutID;

  return (...rest) => {
    clearTimeout(setTimeoutID);

    setTimeoutID = setTimeout( () => callback.apply(this, rest), timeout);
  };
}

export { showAlert, debounce };

function getRandomPositiveInteger(a, b = 1) {
  if (a === undefined) {
    throw new Error('Первый параметр должен быть число');
  }

  // Math.ceil округляет до большего целого
  // Math.floor округляет до меньшего целого
  // Math.abs модуль числа
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  // формула диапазона A - B:  random * (B - A + 1) + A
  // random - случайное число меньше нуля
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomGeolocation(from, to, afterTheDot) {
  if (to <= from) {
    return NaN;
  }

  let randomValue;
  do {
    randomValue = Math.random() * to;
  } while (randomValue < from);

  return randomValue.toFixed(afterTheDot);
}

function showAlert(text) {
  const alert = document.createElement('div');
  alert.style.zIndex = 100;
  alert.style.backgroundColor = '#f56b6bbd';
  alert.style.color = '#ffffff';
  alert.style.position = 'absolute';
  alert.style.padding = '10px';
  alert.style.top = 0;
  alert.style.left = '20%';
  alert.style.right = '20%';
  alert.style.margin = '0 auto';
  alert.style.fontSize = '24px';
  alert.style.textAlign = 'center';
  alert.style.borderBottomLeftRadius = '6px';
  alert.style.borderBottomRightRadius = '6px';
  alert.textContent = text;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
}

export { getRandomPositiveInteger, getRandomGeolocation, showAlert };

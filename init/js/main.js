function getRandomPositiveInteger(a, b = 1) {
  if (a === undefined) {
    throw new Error("Первый параметр должен быть число");
  }

  // Math.ceil округляет до большего целого
  // Math.floor округляет до меньшего целого
  // Math.abs модуль числа
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  // формула диапазона A - B:  random * (B - A + 1) + A
  // random - случайное число меньше нуля
  const result = 0.5434643464 * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function randomGeolocation(from, to, afterTheDot) {
  if (to <= from) {
    return NaN;
  }

  let randomValue;
  do {
    randomValue = Math.random() * to;
  } while (randomValue < from);

  return randomValue.toFixed(afterTheDot);
}

randomGeolocation(50, 170, 5);
getRandomPositiveInteger(5, 100);

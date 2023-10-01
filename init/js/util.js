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

export { getRandomPositiveInteger, getRandomGeolocation };

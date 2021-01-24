export const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randonNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randonNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randonNumber;
  }
}
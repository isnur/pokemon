export const getIdFromUrl = (url) => {
  const regexp = /\/(\d+?)\/?$/g
  const result = regexp.exec(url);
  return result && result.length > 0 ? parseInt(result[1], 10) : null;
};

export const capitalizeFirstLetters = (str) => {
  const addSpace = str.replace(/-/g, ' ');
  return addSpace.toLowerCase().replace(/^\w|\s\w/g, letter => {
    return letter.toUpperCase();
  })
};

export const successProbability = (p) => {
  let result;
  for (let i = 0; i < 2; i++) {
    if (Math.random() < p) { result = true } else { result = false }
  }
  return result;
};

export const convertUnits = (value) => {
  return value / 10;
};
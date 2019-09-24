export const getIdFromUrl = (url) => {
  const regexp = /\/(\d+?)\/?$/g
  const result = regexp.exec(url);
  return result && result.length > 0 ? parseInt(result[1], 10) : null;
};

export const capitalizeFirstLetters = (str) => {
  if (str) {
    const addSpace = str.replace(/-/g, ' ');
    return addSpace.toLowerCase().replace(/^\w|\s\w/g, letter => {
      return letter.toUpperCase();
    })
  }
  return '';
};

export const successProbability = (p) => {
  return Math.random() < p;
};

export const convertUnits = (value) => {
  return value / 10;
};
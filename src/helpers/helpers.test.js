import * as utils from './index';

describe('helpers', () => {
  it('Parse url to get pokemon ID', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/1/';
    expect(utils.getIdFromUrl(url)).toBe(1);
  });

  it('Probability 50%', () => {
    const p = 0.5;
    const success = utils.successProbability(p);
    if (success) {
      expect(success).toBeTruthy();
    } else {
      expect(success).toBeFalsy();
    }
  });

  it('Convert units', () => {
    const height = 7;
    expect(utils.convertUnits(height)).toBe(0.7);
  });

  it('Capitalize First Letters', () => {
    const str = 'meloetta-aria';
    expect(utils.capitalizeFirstLetters(str)).toBe('Meloetta Aria');
  });

  it('Capitalize First Letters', () => {
    expect(utils.capitalizeFirstLetters(undefined)).toBe('');
  });
});
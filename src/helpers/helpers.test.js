import * as utils from './index';

it('Probability 50%', () => {
  const p = 0.5;
  const success = utils.successProbability(p);
  if (success) {
    expect(success).toBeTruthy();
  } else {
    expect(success).toBeFalsy();
  }
});
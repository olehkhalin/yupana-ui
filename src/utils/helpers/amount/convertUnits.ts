import BigNumber from 'bignumber.js';

export const convertUnits = (
  n: number | BigNumber, unit: number | BigNumber = 18,
) => (
  new BigNumber(n).div(new BigNumber(10).pow(unit))
);

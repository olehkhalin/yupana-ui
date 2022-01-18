import BigNumber from 'bignumber.js';

export const precision = (value: number | BigNumber) => (
  new BigNumber(10).pow(value)
);

import BigNumber from 'bignumber.js';

export const convertTokenPrice = (price: BigNumber, decimals: BigNumber): BigNumber => (
  price.div(1e24).times(decimals)
);

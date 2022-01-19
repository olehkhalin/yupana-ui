import BigNumber from 'bignumber.js';
import { ORACLE_PRICE_PRECISION } from 'constants/default';

export const convertTokenPrice = (price: BigNumber, decimals: BigNumber): BigNumber => (
  price.div(new BigNumber(10).pow(ORACLE_PRICE_PRECISION)).times(decimals)
);

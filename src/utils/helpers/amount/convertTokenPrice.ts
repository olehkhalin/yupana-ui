import BigNumber from 'bignumber.js';
import { ORACLE_PRICE_PRECISION } from 'constants/default';

export const convertTokenPrice = (price: BigNumber, decimals: BigNumber): BigNumber => (
  price.div(`1e${ORACLE_PRICE_PRECISION}`).times(decimals)
);

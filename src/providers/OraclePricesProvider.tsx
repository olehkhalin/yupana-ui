import constate from 'constate';
import { useState, useCallback } from 'react';
import BigNumber from 'bignumber.js';

export type OraclePriceType = { price: BigNumber, decimals: BigNumber };
export type OraclePricesType = { [key: number]: OraclePriceType };

export const [
  OraclePricesProvider,
  useOraclePrices,
] = constate(() => {
  const [pricesState, setPricesState] = useState<OraclePricesType | null>(null);

  const setOraclePrices = useCallback((prices: OraclePricesType | null) => {
    setPricesState(prices);
  }, []);

  return {
    oraclePrices: pricesState,
    setOraclePrices,
  };
});

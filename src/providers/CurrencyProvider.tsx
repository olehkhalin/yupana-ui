import { useState, useEffect, useCallback } from 'react';
import constate from 'constate';
import BigNumber from 'bignumber.js';
import { getPrettyAmount } from 'utils/helpers/amount';

export enum CurrencyEnum {
  XTZ = 'xtz',
  USD = 'usd',
}

export const [
  CurrencyProvider,
  useCurrency,
] = constate(() => {
  const [currencyState, setCurrencyState] = useState<CurrencyEnum>(CurrencyEnum.XTZ);
  const [tezosPrice, setTezosPrice] = useState<number>(1);

  const setCurrency = useCallback((currency: CurrencyEnum) => {
    window.localStorage.setItem('currency', currency);
    setCurrencyState(currency);
  }, []);

  useEffect(() => {
    const localCurrency = window.localStorage.getItem('currency') as CurrencyEnum;
    if (localCurrency) {
      setCurrencyState(localCurrency);
    } else {
      setCurrency(CurrencyEnum.XTZ);
    }
  }, [setCurrency]);

  // Convert price by global basic currency
  const convertPriceByBasicCurrency = (
    number: number | BigNumber,
  ) => (
    currencyState === CurrencyEnum.XTZ
      ? getPrettyAmount({ value: +number / tezosPrice, currency: 'ꜩ' })
      : getPrettyAmount({ value: number, currency: '$' })
  );

  return {
    currency: currencyState,
    setCurrency,
    tezosPrice,
    setTezosPrice,
    convertPriceByBasicCurrency,
  };
});

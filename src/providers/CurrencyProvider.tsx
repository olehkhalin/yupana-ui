import constate from 'constate';
import { useState, useEffect, useCallback } from 'react';

export enum CurrencyEnum {
  XTZ = 'xtz',
  USD = 'usd',
}

export const [
  CurrencyProvider,
  useCurrency,
] = constate(() => {
  const [currencyState, setCurrencyState] = useState<CurrencyEnum>(CurrencyEnum.XTZ);

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

  return {
    currency: currencyState,
    setCurrency,
  };
});

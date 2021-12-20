import constate from 'constate';
import { useState, useEffect, useCallback } from 'react';

export enum CurrencyEnum {
  XTZ = 'xtz',
  USD = 'usd',
}

export type AssetsPrice = {
  ytoken: number
  name: string
  price: number
};

export const [
  CurrencyProvider,
  useCurrency,
] = constate(() => {
  const [currencyState, setCurrencyState] = useState<CurrencyEnum>(CurrencyEnum.XTZ);
  const [assetsPrice, setAssetsPrice] = useState<AssetsPrice[]>([]);

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

  const getPriceByCurrentToken = (yToken: number): number => assetsPrice
    .find((el) => el.ytoken === yToken)?.price ?? 1;

  return {
    currency: currencyState,
    setCurrency,
    setAssetsPrice,
    assetsPrice,
    getPriceByCurrentToken,
  };
});

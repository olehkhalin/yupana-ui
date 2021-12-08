import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

import { XTZ_CURRENT_PRICE } from 'constants/default';

enum CurrencyEnum {
  XTZ = 'xtz',
  USD = 'usd',
}

export type CurrencyContextValue = {
  currency: CurrencyEnum
  tezosPriceInUsd: number
  setCurrency: (arg: CurrencyEnum) => void
  setTezosPriceInUsd: (arg: number) => void
};

export const CurrencyContext = createContext<CurrencyContextValue>({
  currency: CurrencyEnum.XTZ,
  tezosPriceInUsd: XTZ_CURRENT_PRICE,
  setCurrency: () => { },
  setTezosPriceInUsd: () => { },
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyEnum>(CurrencyEnum.XTZ);
  const [tezosPriceInUsd, setTezosPriceInUsd] = useState<number>(XTZ_CURRENT_PRICE);

  // get XTZ current price form api and add to useEffect
  // const { data } = useGetTezosPriceInUsd();

  useEffect(() => {
    const currencyFromLS: string | null = localStorage.getItem('currency');
    if (currencyFromLS) {
      setCurrency(currencyFromLS as CurrencyEnum);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency,
      tezosPriceInUsd,
      setTezosPriceInUsd,
    }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

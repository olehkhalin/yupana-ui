import { useState, useEffect, useCallback } from "react";
import constate from "constate";
import BigNumber from "bignumber.js";
import useSWR from "swr";

import { TEZOS_PRICE_API_URL } from "constants/defaults";
import { useOnBlock, useTezos } from "utils/dapp";

export enum CurrencyEnum {
  XTZ = "xtz",
  USD = "usd",
}

export const [CurrencyProvider, useCurrency] = constate(() => {
  const tezos = useTezos();

  const [currencyState, setCurrencyState] = useState<CurrencyEnum>(
    CurrencyEnum.XTZ
  );
  const [tezosPrice, setTezosPrice] = useState<BigNumber>(new BigNumber(1));

  const setCurrency = useCallback((currency: CurrencyEnum) => {
    window.localStorage.setItem("currency", currency);
    setCurrencyState(currency);
  }, []);

  useEffect(() => {
    const localCurrency = window.localStorage.getItem(
      "currency"
    ) as CurrencyEnum;
    if (localCurrency) {
      setCurrencyState(localCurrency);
    } else {
      setCurrency(CurrencyEnum.XTZ);
    }
  }, [setCurrency]);

  const fetchTezosPrice = useCallback(async () => {
    try {
      const response = await fetch(TEZOS_PRICE_API_URL);
      return await response.json();
    } catch (e) {
      console.log("Fetch tezos price error:", e);
    }

    return undefined;
  }, []);

  const { data: allTezosData, mutate } = useSWR(
    ["tezos-price"],
    fetchTezosPrice,
    { refreshInterval: 30000 }
  );

  useOnBlock(tezos, [mutate]);

  useEffect(() => {
    if (allTezosData && allTezosData.usd) {
      setTezosPrice(new BigNumber(allTezosData.usd));
    }
  }, [allTezosData]);

  const convertPriceByBasicCurrency = (number: BigNumber) =>
    currencyState === CurrencyEnum.XTZ
      ? number.decimalPlaces(6, BigNumber.ROUND_DOWN)
      : number.multipliedBy(tezosPrice).decimalPlaces(2, BigNumber.ROUND_DOWN);

  return {
    currency: currencyState,
    setCurrency,
    convertPriceByBasicCurrency,
  };
});

import { useState, useCallback } from "react";
import constate from "constate";

import {
  ORACLE_PRICES_CONTRACT_FALLBACK,
  YUPANA_CONTRACT_FALLBACK,
} from "constants/defaults";

type GlobalFactorsType = {
  yupanaContract: string;
  oraclePricesContract: string;
};

const fallbackGlobalFactors = {
  yupanaContract: YUPANA_CONTRACT_FALLBACK,
  oraclePricesContract: ORACLE_PRICES_CONTRACT_FALLBACK,
};

export const [GlobalFactorsProvider, useGlobalFactors] = constate(() => {
  const [globalFactorsState, setGlobalFactorsState] =
    useState<GlobalFactorsType>(fallbackGlobalFactors);

  const setGlobalFactors = useCallback(
    (newGlobalFactors: GlobalFactorsType) => {
      setGlobalFactorsState(newGlobalFactors);
    },
    []
  );

  return {
    globalFactors: globalFactorsState,
    setGlobalFactors,
  };
});

import { useEffect } from "react";

import { useGlobalFactorsQuery, useOraclePriceQuery } from "generated/graphql";
import {
  calculateCollaterals,
  calculateOutstandingBorrow,
  calculateUsdTotal,
} from "utils/helpers/api";
import { contractAddressesVar, globalVariablesVar } from "utils/cache";

import { useAssets } from "./useAssets";

export const useInitialSetup = () => {
  const { data: contractAddressesData } = useGlobalFactorsQuery();
  const { data: oraclePrices } = useOraclePriceQuery();

  const { data } = useAssets();

  useEffect(() => {
    if (contractAddressesData) {
      contractAddressesVar({
        fabrica: contractAddressesData.globalFactors[0].yupanaContract,
        priceFeedProxy: contractAddressesData.globalFactors[0].priceFeedProxy,
      });
    }
  }, [contractAddressesData]);

  useEffect(() => {
    if (data && oraclePrices) {
      const { maxCollateral, liquidationCollateral } = calculateCollaterals(
        data.supplyAssets,
        oraclePrices
      );
      const outstandingBorrow = calculateOutstandingBorrow(
        data.borrowAssets,
        oraclePrices
      );
      const { totalUsdSupply, totalUsdBorrowed } = calculateUsdTotal(
        data.assets,
        oraclePrices
      );

      globalVariablesVar({
        maxCollateral,
        liquidationCollateral,
        outstandingBorrow,
        totalUsdSupply,
        totalUsdBorrowed,
      });
    }
  });
};

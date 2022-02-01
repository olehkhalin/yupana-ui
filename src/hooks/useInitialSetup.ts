import { useEffect } from "react";

import {
  useAllAssetsLazyQuery,
  useGlobalFactorsQuery,
  useOraclePriceLazyQuery,
  useUserBorrowAssetsLazyQuery,
  useUserSupplyAssetsLazyQuery,
} from "generated/graphql";
import {
  calculateCollaterals,
  calculateOutstandingBorrow,
} from "utils/dapp/helpers";
import { contractAddressesVar, globalVariablesVar } from "utils/cache";
import { useAccountPkh, useTezos } from "utils/dapp";

import { useOnBlockApollo, useOnBlockApolloWithData } from "./useOnBlockApollo";
import { useAssets } from "./useAssets";

export const useInitialSetup = () => {
  const tezos = useTezos();
  const accountPkh = useAccountPkh();

  const { data: contractAddressesData } = useGlobalFactorsQuery();
  const oraclePrices = useOnBlockApolloWithData(tezos, useOraclePriceLazyQuery);
  useOnBlockApollo(tezos, useAllAssetsLazyQuery);
  useOnBlockApollo(tezos, useUserSupplyAssetsLazyQuery, true, accountPkh);
  useOnBlockApollo(tezos, useUserBorrowAssetsLazyQuery, true, accountPkh);

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
    if (data) {
      const { maxCollateral, liquidationCollateral } = calculateCollaterals(
        data.supplyAssets,
        oraclePrices
      );
      const outstandingBorrow = calculateOutstandingBorrow(
        data.borrowAssets,
        oraclePrices
      );

      globalVariablesVar({
        maxCollateral,
        liquidationCollateral,
        outstandingBorrow,
      });
    }
  });
};

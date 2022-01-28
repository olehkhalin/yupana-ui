import { useEffect } from "react";

import {
  useAllAssetsLazyQuery,
  useGlobalFactorsQuery,
  useOraclePriceLazyQuery,
  useUserBorrowAssetsLazyQuery,
  useUserSupplyAssetsLazyQuery,
} from "generated/graphql";
import {
  calculateMaxCollateral,
  calculateOutstandingBorrow,
} from "utils/dapp/helpers";
import { contractAddressesVar, globalVariablesVar } from "utils/cache";
import { useAccountPkh, useTezos } from "utils/dapp";
import { useOnBlockApolloWithData } from "./useOnBlockApollo";

export const useInitialSetup = () => {
  const tezos = useTezos();
  const accountPkh = useAccountPkh();

  const { data: contractAddressesData } = useGlobalFactorsQuery();
  const oraclePrices = useOnBlockApolloWithData(tezos, useOraclePriceLazyQuery);
  const allAssets = useOnBlockApolloWithData(tezos, useAllAssetsLazyQuery);
  const userSupplyAssets = useOnBlockApolloWithData(
    tezos,
    useUserSupplyAssetsLazyQuery,
    true,
    accountPkh
  );
  const userBorrowAssets = useOnBlockApolloWithData(
    tezos,
    useUserBorrowAssetsLazyQuery,
    true,
    accountPkh
  );

  useEffect(() => {
    const maxCollateral = calculateMaxCollateral(
      allAssets,
      oraclePrices,
      userSupplyAssets
    );
    const outstandingBorrow = calculateOutstandingBorrow(
      allAssets,
      oraclePrices,
      userBorrowAssets
    );

    globalVariablesVar({
      maxCollateral,
      outstandingBorrow,
    });
  }, [allAssets, oraclePrices, userBorrowAssets, userSupplyAssets]);

  useEffect(() => {
    if (contractAddressesData) {
      contractAddressesVar({
        fabrica: contractAddressesData.globalFactors[0].yupanaContract,
        priceFeedProxy: contractAddressesData.globalFactors[0].priceFeedProxy,
      });
    }
  }, [contractAddressesData]);
};

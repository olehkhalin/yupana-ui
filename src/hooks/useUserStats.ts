import { useEffect } from "react";
import BigNumber from "bignumber.js";

import {
  useAllAssetsQuery,
  useOraclePriceQuery,
  useUserBorrowAssetsLazyQuery,
  useUserSupplyAssetsLazyQuery,
} from "generated/graphql";
import { useAccountPkh } from "utils/dapp";

export const useUserStats = () => {
  const accountPkh = useAccountPkh();

  const {
    data: assets,
    loading: assetsLoading,
    error: assetsError,
  } = useAllAssetsQuery();

  const {
    data: oraclePrices,
    loading: oraclePricesLoading,
    error: oraclePricesError,
  } = useOraclePriceQuery();

  const [
    fetchSupplyAssets,
    {
      data: supplyAssets,
      loading: supplyAssetsLoading,
      error: supplyAssetsError,
    },
  ] = useUserSupplyAssetsLazyQuery();

  const [
    fetchBorrowAssets,
    {
      data: borrowAssets,
      loading: borrowAssetsLoading,
      error: borrowAssetsError,
    },
  ] = useUserBorrowAssetsLazyQuery();

  useEffect(() => {
    if (accountPkh) {
      fetchSupplyAssets({
        variables: {
          account: accountPkh,
        },
      });
      fetchBorrowAssets({
        variables: {
          account: accountPkh,
        },
      });
    }
  }, [accountPkh, fetchBorrowAssets, fetchSupplyAssets]);

  if (
    assetsError ||
    supplyAssetsError ||
    borrowAssetsError ||
    oraclePricesError
  ) {
    return {
      data: null,
      loading: false,
      error: true,
    };
  }

  if (
    !assets ||
    !supplyAssets ||
    !borrowAssets ||
    !oraclePrices ||
    !accountPkh
  ) {
    return {
      data: null,
      loading:
        assetsLoading &&
        supplyAssetsLoading &&
        borrowAssetsLoading &&
        oraclePricesLoading,
      error: false,
    };
  }

  let totalNet = new BigNumber(0);
  let totalSupplyUsd = new BigNumber(0);
  let totalBorrowUsd = new BigNumber(0);

  assets.asset.forEach((asset) => {
    let supplyUsdAmount = new BigNumber(0);

    const userSupply = supplyAssets.userSupply.find(
      ({ assetId }) => assetId === asset.ytoken
    );
    if (userSupply) {
      const lastPrice = oraclePrices.oraclePrice.find(
        ({ ytoken }) => ytoken === asset.ytoken
      );
      if (lastPrice) {
        supplyUsdAmount = new BigNumber(userSupply.supply).multipliedBy(
          lastPrice.price
        );
      }
    }

    let borrowUsdAmount = new BigNumber(0);

    const userBorrow = borrowAssets.userBorrow.find(
      ({ assetId }) => assetId === asset.ytoken
    );
    if (userBorrow) {
      const lastPrice = oraclePrices.oraclePrice.find(
        ({ ytoken }) => ytoken === asset.ytoken
      );
      if (lastPrice) {
        const borrow = new BigNumber(userBorrow.borrow).plus(0); // TODO: Replace with user_borrow.accrued_interest
        borrowUsdAmount = borrow.multipliedBy(lastPrice.price);
      }
    }

    totalSupplyUsd = totalSupplyUsd.plus(supplyUsdAmount);
    totalBorrowUsd = totalBorrowUsd.plus(borrowUsdAmount);

    if (asset.rates) {
      const net = supplyUsdAmount
        .multipliedBy(asset.rates[0].supply_apy)
        .minus(borrowUsdAmount.multipliedBy(asset.rates[0].borrow_apy));
      totalNet = totalNet.plus(net);
    }
  });

  let netApy = new BigNumber(0);
  if (totalNet.gt(0)) {
    netApy = totalNet.div(totalSupplyUsd);
  } else if (totalNet.lt(0)) {
    netApy = totalNet.div(totalBorrowUsd);
  }

  return {
    data: {
      totalSupplyUsd,
      totalBorrowUsd,
      netApy,
    },
    loading: false,
    error: false,
  };
};

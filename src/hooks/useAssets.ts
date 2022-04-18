import { useCallback, useEffect, useMemo } from "react";
import BigNumber from "bignumber.js";
import constate from "constate";
import useSWR from "swr";

import {
  REACT_APP_TOKENS_METADATA_API_URL,
  STANDARD_PRECISION,
} from "constants/defaults";
import {
  useAllAssetsQuery,
  useUserBorrowAssetsLazyQuery,
  useUserSupplyAssetsLazyQuery,
} from "generated/graphql";
import { UseAssetsResponse } from "types/asset";
import { useAccountPkh } from "utils/dapp";
import { BorrowedYTokensType, borrowedYTokensVar } from "utils/cache";

const returnZeroIfNotExist = (element: any, key: string) =>
  element ? element[key] : new BigNumber(0);

export const [AssetsProvider, useAssets] = constate(() => {
  const accountPkh = useAccountPkh();

  const {
    data: assets,
    loading: assetsLoading,
    error: assetsError,
  } = useAllAssetsQuery();

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

  const assetsString = useMemo(
    () =>
      assets
        ? JSON.stringify(
            assets.asset.map(
              (ass) =>
                `${ass.contractAddress}${ass.isFa2 ? `_${ass.tokenId}` : "_0"}`
            )
          )
        : null,
    [assets]
  );

  const fetchAssetsMetadata = useCallback(async () => {
    if (assetsString) {
      const response = await fetch(REACT_APP_TOKENS_METADATA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: assetsString,
      });
      return await response.json();
    }

    return undefined;
  }, [assetsString]);

  const { data: allAssetsMetadata, error: allAssetsMetadataError } = useSWR(
    ["all-assets-metadata", assetsString],
    fetchAssetsMetadata
  );

  if (!assets || !allAssetsMetadata) {
    return {
      data: null,
      loading:
        assetsLoading ||
        supplyAssetsLoading ||
        borrowAssetsLoading ||
        (!allAssetsMetadata && !allAssetsMetadataError),
      error:
        !!assetsError ||
        !!supplyAssetsError ||
        !!borrowAssetsError ||
        !!allAssetsMetadataError,
    };
  }

  const preparedSupplyAssets = supplyAssets
    ? supplyAssets.userSupply.map((asset) => ({
        assetId: asset.assetId,
        supply: new BigNumber(asset.supply),
        isCollateral: asset.entered,
      }))
    : [];

  const borrowedYTokens: BorrowedYTokensType = [];

  const preparedBorrowAssets = borrowAssets
    ? borrowAssets.userBorrow.map((asset) => {
        if (
          new BigNumber(asset.borrow).gte(
            new BigNumber(10).pow(STANDARD_PRECISION)
          )
        ) {
          borrowedYTokens.push(asset.assetId);
        }
        const assetInfo = assets.asset.find(
          ({ ytoken }) => ytoken === asset.assetId
        )!;

        const deltaInSeconds = new BigNumber(
          new BigNumber(new Date().getTime()).minus(
            new Date(assetInfo.interestUpdateTime).getTime()
          )
        ).div(1000);
        const interestFactor = new BigNumber(
          assetInfo.rates[0].borrow_rate
        ).multipliedBy(deltaInSeconds);
        const borrowIndex = interestFactor
          .multipliedBy(asset.borrowIndex)
          .div(new BigNumber(10).pow(STANDARD_PRECISION))
          .plus(asset.borrowIndex);
        const borrowWithInterest = new BigNumber(asset.borrow)
          .multipliedBy(borrowIndex)
          .div(asset.borrowIndex);

        return {
          assetId: asset.assetId,
          borrow: new BigNumber(asset.borrow),
          borrowIndex: new BigNumber(asset.borrowIndex),
          borrowWithInterest,
        };
      })
    : [];

  borrowedYTokensVar(borrowedYTokens);

  const finalAssets = assets.asset.map((asset, i) => {
    const borrowAsset = preparedBorrowAssets.find(
      ({ assetId }) => assetId === asset.ytoken
    );
    const supplyAsset = preparedSupplyAssets.find(
      ({ assetId }) => assetId === asset.ytoken
    );

    const deltaInSeconds = new BigNumber(
      new BigNumber(new Date().getTime()).minus(
        new Date(asset.interestUpdateTime).getTime()
      )
    ).div(1000);
    const interestFactor = new BigNumber(
      asset.rates[0].borrow_rate
    ).multipliedBy(deltaInSeconds);

    const interestAccumulatedF = interestFactor
      .multipliedBy(asset.totalBorrowed)
      .div(new BigNumber(10).pow(STANDARD_PRECISION));
    const predictedTotalBorrowsF = interestAccumulatedF.plus(
      asset.totalBorrowed
    );
    const predictedTotalReservesF = interestAccumulatedF
      .multipliedBy(asset.reserveFactor)
      .div(new BigNumber(10).pow(STANDARD_PRECISION))
      .plus(asset.reserves);

    const predictedExchangeRate = new BigNumber(asset.totalSupply).gt(0)
      ? new BigNumber(asset.totalLiquid)
          .plus(predictedTotalBorrowsF)
          .minus(predictedTotalReservesF)
          .div(asset.totalSupply)
      : new BigNumber(1);

    const supplyWithInterest = supplyAsset
      ? supplyAsset.supply.multipliedBy(predictedExchangeRate)
      : new BigNumber(0);

    return {
      yToken: asset.ytoken,
      asset: {
        contractAddress: asset.contractAddress,
        isFa2: asset.isFa2,
        tokenId: asset.isFa2 ? asset.tokenId : undefined,
        decimals: allAssetsMetadata[i].decimals,
        name: allAssetsMetadata[i].name,
        symbol: allAssetsMetadata[i].symbol,
        thumbnail: allAssetsMetadata[i].thumbnailUri,
      },
      collateralFactor: new BigNumber(asset.collateralFactor),
      interestUpdateTime: asset.interestUpdateTime,
      liquidationThreshold: new BigNumber(asset.liquidationThreshold),
      rates: {
        borrowApy: new BigNumber(asset.rates[0].borrow_apy),
        borrowRate: new BigNumber(asset.rates[0].borrow_rate),
        supplyApy: new BigNumber(asset.rates[0].supply_apy),
        utilizationRate: new BigNumber(asset.rates[0].utilization_rate),
      },
      reserves: new BigNumber(asset.reserves),
      totalBorrowed: new BigNumber(asset.totalBorrowed),
      totalLiquid: new BigNumber(asset.totalLiquid),
      totalSupply: new BigNumber(asset.totalSupply),
      exchangeRate: predictedExchangeRate,
      borrow: returnZeroIfNotExist(borrowAsset, "borrow"),
      borrowIndex: returnZeroIfNotExist(borrowAsset, "borrowIndex"),
      borrowWithInterest: returnZeroIfNotExist(
        borrowAsset,
        "borrowWithInterest"
      ),
      supply: returnZeroIfNotExist(supplyAsset, "supply"),
      supplyWithInterest,
      isCollateral: supplyAsset ? supplyAsset.isCollateral : false,
      numberOfSuppliers: asset.suppliersCount.aggregate?.count ?? 0,
      numberOfBorrowers: asset.borrowersCount.aggregate?.count ?? 0,
    };
  });

  const finalSupplyAssets = preparedSupplyAssets.map(
    (asset) => finalAssets.find(({ yToken }) => yToken === asset.assetId)!
  );

  const finalBorrowAssets = preparedBorrowAssets.map(
    (asset) => finalAssets.find(({ yToken }) => yToken === asset.assetId)!
  );

  return {
    data: {
      assets: finalAssets,
      supplyAssets: finalSupplyAssets,
      borrowAssets: finalBorrowAssets,
    },
    loading: false,
    error: false,
  } as UseAssetsResponse;
});

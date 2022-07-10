import { useEffect } from "react";
import BigNumber from "bignumber.js";
import constate from "constate";

import { STANDARD_PRECISION } from "constants/defaults";
import {
  useAllAssetsQuery,
  useUserBorrowAssetsLazyQuery,
  useUserSupplyAssetsLazyQuery,
} from "generated/graphql";
import { UseAssetsResponse } from "types/asset";
import { useAccountPkh } from "utils/dapp";
import { convertUnits } from "utils/helpers/amount";
import {
  BorrowedYTokensType,
  borrowedYTokensVar,
  trulyBorrowedYTokensVar,
} from "utils/cache";

import { useAssetsMetadata } from "./useAssetsMetadata";

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

  const {
    data: allAssetsMetadata,
    loading: allAssetsMetadataLoading,
    error: allAssetsMetadataError,
  } = useAssetsMetadata();

  if (!assets || !allAssetsMetadata) {
    return {
      data: null,
      loading:
        assetsLoading ||
        supplyAssetsLoading ||
        borrowAssetsLoading ||
        allAssetsMetadataLoading,
      error:
        !!assetsError ||
        !!supplyAssetsError ||
        !!borrowAssetsError ||
        !!allAssetsMetadataError,
    };
  }

  const borrowedYTokens: BorrowedYTokensType = [];
  const trulyBorrowedYTokens: BorrowedYTokensType = [];

  const preparedSupplyAssets = supplyAssets
    ? supplyAssets.userSupply.map((asset) => {
        borrowedYTokens.push(asset.assetId);
        return {
          assetId: asset.assetId,
          supply: new BigNumber(asset.supply),
          isCollateral: asset.entered,
        };
      })
    : [];

  const preparedBorrowAssets = borrowAssets
    ? borrowAssets.userBorrow.map((asset) => {
        if (convertUnits(asset.borrow, STANDARD_PRECISION).gt(1)) {
          trulyBorrowedYTokens.push(asset.assetId);
        }
        if (borrowedYTokens.find((el) => el === asset.assetId) === undefined) {
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

        const deltaInSecondsR = new BigNumber(
          new BigNumber(new Date().getTime())
            .plus(300000)
            .minus(new Date(assetInfo.interestUpdateTime).getTime())
        ).div(1000);
        const interestFactorR = new BigNumber(
          assetInfo.rates[0].borrow_rate
        ).multipliedBy(deltaInSecondsR);
        const borrowIndexR = interestFactorR
          .multipliedBy(asset.borrowIndex)
          .div(new BigNumber(10).pow(STANDARD_PRECISION))
          .plus(asset.borrowIndex);
        const borrowInterestReserves = borrowIndexR.div(asset.borrowIndex);

        const borrowWithInterest = new BigNumber(asset.borrow)
          .multipliedBy(borrowIndex)
          .div(asset.borrowIndex);

        return {
          assetId: asset.assetId,
          borrow: new BigNumber(asset.borrow),
          borrowIndex: new BigNumber(asset.borrowIndex),
          borrowWithInterest,
          borrowInterestReserves,
        };
      })
    : [];

  borrowedYTokensVar(borrowedYTokens);
  trulyBorrowedYTokensVar(trulyBorrowedYTokens);

  const finalAssets = assets.asset.map((asset) => {
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

    const metadata = allAssetsMetadata.find(
      ({ contractAddress, tokenId }) =>
        contractAddress === asset.contractAddress &&
        (asset.isFa2 ? tokenId === asset.tokenId : true)
    )!;

    return {
      yToken: asset.ytoken,
      asset: {
        contractAddress: asset.contractAddress,
        isFa2: asset.isFa2,
        tokenId: asset.isFa2 ? asset.tokenId : undefined,
        decimals: metadata.decimals,
        name: metadata.name,
        symbol: metadata.symbol,
        thumbnail: metadata.thumbnail,
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
      borrowInterestReserves: borrowAsset?.borrowInterestReserves ?? 1,
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

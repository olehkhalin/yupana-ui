import React, { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import BigNumber from "bignumber.js";

import { useAssets } from "hooks/useAssets";
import { MarketsDetailsQuery, useMarketsDetailsQuery } from "generated/graphql";
import { prepareMarketsDetails } from "utils/helpers/api";
import BaseLayout from "layouts/BaseLayout";
import NotFound from "pages/not-found";
import {
  TokenDetails,
  TokenDetailsLoading,
} from "components/markets-details/TokenDetails";
import {
  MarketsDetailsInfo,
  MarketsDetailsInfoLoading,
} from "components/markets-details/MarketsDetailsInfo";
import {
  InterestRateModel,
  InterestRateModelLoading,
} from "components/markets-details/InterestRateModel";

import s from "./MarketsDetails.module.sass";

type MarketsDetailsInnerProps = {
  data?: MarketsDetailsQuery;
  exchangeRate?: BigNumber;
  loading: boolean;
};

const MarketsDetailsInner: FC<MarketsDetailsInnerProps> = ({
  data,
  exchangeRate,
  loading,
}) => {
  const preparedData = useMemo(() => {
    if (
      loading ||
      !(data && data.asset && data.asset.length !== 0) ||
      !exchangeRate
    ) {
      return "loading";
    }

    return prepareMarketsDetails(data, exchangeRate);
  }, [data, exchangeRate, loading]);

  if (preparedData === "loading") {
    return (
      <>
        <TokenDetailsLoading className={s.tokenDetails} />
        <MarketsDetailsInfoLoading />
        <InterestRateModelLoading />
      </>
    );
  }

  return (
    <>
      <TokenDetails
        asset={preparedData.asset}
        data={preparedData.tokenDetails}
        price={preparedData.price}
        className={s.tokenDetails}
      />
      <MarketsDetailsInfo
        asset={preparedData.asset}
        price={preparedData.price}
        availableLiquidity={preparedData.marketDetails.availableLiquidity}
        totalBorrow={preparedData.marketDetails.totalBorrow}
        utilisationRate={preparedData.marketDetails.utilisationRate}
        collateralFactor={preparedData.marketDetails.collateralFactor}
        liquidationThreshold={preparedData.marketDetails.liquidationThreshold}
        liquidationBonus={preparedData.marketDetails.liquidationBonus}
        reserves={preparedData.marketDetails.reserves}
        reserveFactor={preparedData.marketDetails.reserveFactor}
        minted={preparedData.marketDetails.minted}
        exchangeRate={preparedData.marketDetails.exchangeRate}
      />
      <InterestRateModel
        asset={preparedData.asset}
        currentUtilizationRate={
          preparedData.interestRateModel.currentUtilizationRate
        }
        baseRatePerYear={preparedData.interestRateModel.baseRatePerYear}
        multiplierPerYear={preparedData.interestRateModel.multiplierPerYear}
        jumpMultiplierPerYear={
          preparedData.interestRateModel.jumpMultiplierPerYear
        }
        kink={preparedData.interestRateModel.kink}
      />
    </>
  );
};

export const MarketsDetails: FC = () => {
  // @ts-ignore
  const { yToken: yTokenString }: { yToken: string } = useParams();
  const yToken = +yTokenString;

  const { data, error, loading } = useMarketsDetailsQuery({
    variables: {
      yToken,
    },
  });
  const {
    data: assetsData,
    loading: assetsLoading,
    error: assetsError,
  } = useAssets();

  if (
    (!loading && (!data || data.asset.length === 0)) ||
    (!assetsLoading &&
      (!assetsData ||
        !assetsData.assets.find(
          ({ yToken: assetYToken }) => assetYToken === yToken
        ))) ||
    error ||
    assetsError
  ) {
    return <NotFound />;
  }

  return (
    <BaseLayout>
      <MarketsDetailsInner
        data={data}
        exchangeRate={
          assetsData?.assets.find(
            ({ yToken: assetYToken }) => assetYToken === yToken
          )?.exchangeRate ?? undefined
        }
        loading={loading || assetsLoading}
      />
    </BaseLayout>
  );
};

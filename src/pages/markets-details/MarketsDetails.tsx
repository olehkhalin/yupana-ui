import React, { FC, useMemo } from "react";
import { useParams } from "react-router-dom";

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
  data: MarketsDetailsQuery | undefined;
  loading: boolean;
};

const MarketsDetailsInner: FC<MarketsDetailsInnerProps> = ({
  data,
  loading,
}) => {
  const preparedData = useMemo(() => {
    if (loading || !(data && data.asset && data.asset.length !== 0)) {
      return "loading";
    }

    return prepareMarketsDetails(data);
  }, [data, loading]);

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

  if ((!loading && (!data || data.asset.length === 0)) || error) {
    return <NotFound />;
  }

  return (
    <BaseLayout>
      <MarketsDetailsInner data={data} loading={loading} />
    </BaseLayout>
  );
};

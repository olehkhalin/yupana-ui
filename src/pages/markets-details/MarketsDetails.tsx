import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';

import { useLoading } from 'hooks/useLoading';
import { Asset, MarketsDetailsQuery, useMarketsDetailsQuery } from 'generated/graphql';
import { getPreparedTokenObject } from 'utils/getPreparedTokenObject';
import { getPreparedPercentValue } from 'utils/getPreparedPercentValue';
import { TokenDetails } from 'containers/TokenDetails';
import { MarketDetails } from 'containers/MarketDetails';
import { InterestRateModel } from 'containers/InterestRateModel';
import { MARKET_DETAILS_LOADINT_DATA } from 'components/tables/loading-preview/market-details-loading';

import s from './MarketsDetails.module.sass';

type MarketsDetailsWrapperProps = {
  data: MarketsDetailsQuery
  loading: boolean
};

const MarketsDetailsWrapper: React.FC<MarketsDetailsWrapperProps> = ({
  data,
  loading,
}) => {
  const preparedData = useMemo(() => {
    // Token details
    const el = data.asset[0];
    const asset = getPreparedTokenObject(el as unknown as Asset);
    const totalSupply = new BigNumber(el.totalSupply).div(1e18);
    const supplyApy = getPreparedPercentValue(el as unknown as Asset, 'supply_apy');
    const numberOfSupplier = el.suppliersCount.aggregate?.count ?? 0;
    const totalBorrow = new BigNumber(el.totalBorrowed).div(1e18);
    const borrowApy = getPreparedPercentValue(el as unknown as Asset, 'borrow_apy');
    const numberOfBorrowers = el.borrowersCount.aggregate?.count ?? 0;

    // Market details
    const availableLiquidity = new BigNumber(el.totalLiquid).div(1e18);
    const utilisationRate = getPreparedPercentValue(el as unknown as Asset, 'utilization_rate');
    const collateralFactor = new BigNumber(el.collateralFactor).div(1e18);
    const liquidationThreshold = new BigNumber(data.globalFactors[0].liquidationThreshold)
      .div(1e18);
    const liquidationBonus = new BigNumber(data.globalFactors[0].liquidationIncentive).div(1e18);
    const reserves = new BigNumber(el.reserves).div(1e18);
    const reserveFactor = new BigNumber(el.reserveFactor).div(1e18);
    const exchangeRate = getPreparedPercentValue(el as unknown as Asset, 'exchange_rate');

    // Interest rate model
    const baseRatePerYear = new BigNumber(el.interestModel.rate).div(1e18);
    const multiplierPerYear = new BigNumber(el.interestModel.multiplier).div(1e18);
    const jumpMultiplierPerYear = new BigNumber(el.interestModel.jumpMultiplier).div(1e18);
    const kink = new BigNumber(el.interestModel.kink).div(1e18);

    return {
      asset,
      tokenDetails: [
        {
          totalSupply,
          supplyApy,
          numberOfSupplier,
          totalBorrow,
          borrowApy,
          numberOfBorrowers,
        },
      ],
      marketDetails: {
        priceInUsd: 1,
        availableLiquidity,
        totalBorrow,
        utilisationRate,
        collateralFactor,
        liquidationThreshold,
        liquidationBonus,
        reserves,
        reserveFactor,
        minted: totalSupply,
        exchangeRate,
      },
      interestRateModel: {
        currentUtilizationRate: utilisationRate,
        baseRatePerYear,
        multiplierPerYear,
        jumpMultiplierPerYear,
        kink,
      },
    };
  }, [data]);

  return (
    <>
      <TokenDetails
        asset={preparedData.asset}
        data={loading ? MARKET_DETAILS_LOADINT_DATA : preparedData.tokenDetails}
        loading={loading}
        className={s.tokenDetails}
      />
      <MarketDetails
        asset={preparedData.asset}
        loading={loading}
        data={preparedData.marketDetails}
      />
      <InterestRateModel
        asset={preparedData.asset}
        loading={loading}
        data={preparedData.interestRateModel}
      />
    </>
  );
};

export const MarketsDetails: React.FC = () => {
  const { tokenSlug }: { tokenSlug: string } = useParams();
  const yToken = +tokenSlug.split('&')[1];

  // TODO: Delete later
  const { loading } = useLoading();

  const { data, error } = useMarketsDetailsQuery({
    variables: {
      yToken,
    },
  });

  if (error || !data) { // TODO: Add loading to if statement
    return <>Page not found 404!</>;
  }

  return (
    <MarketsDetailsWrapper
      data={data}
      loading={loading}
    />
  );
};

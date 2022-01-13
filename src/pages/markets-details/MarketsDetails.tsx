import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { STANDARD_PRECISION } from 'constants/default';
import { Asset, MarketsDetailsQuery, useMarketsDetailsQuery } from 'generated/graphql';
import { getPreparedTokenObject } from 'utils/helpers/token';
import { convertUnits, getPreparedPercentValue } from 'utils/helpers/amount';
import { TokenDetails } from 'containers/TokenDetails';
import { MarketDetails } from 'containers/MarketDetails';
import { InterestRateModel } from 'containers/InterestRateModel';

import s from './MarketsDetails.module.sass';

type MarketsDetailsWrapperProps = {
  data: MarketsDetailsQuery
};

const MarketsDetailsWrapper: React.FC<MarketsDetailsWrapperProps> = ({
  data,
}) => {
  const preparedData = useMemo(() => {
    // Token details
    const el = data.asset[0];
    const asset = getPreparedTokenObject(el as unknown as Asset);
    const totalSupply = convertUnits(el.totalSupply, STANDARD_PRECISION);
    const supplyApy = getPreparedPercentValue(el as unknown as Asset, 'supply_apy');
    const numberOfSupplier = el.suppliersCount.aggregate?.count ?? 0;
    const totalBorrow = convertUnits(el.totalBorrowed, STANDARD_PRECISION);
    const borrowApy = getPreparedPercentValue(el as unknown as Asset, 'borrow_apy');
    const numberOfBorrowers = el.borrowersCount.aggregate?.count ?? 0;

    // Market details
    const availableLiquidity = convertUnits(el.totalLiquid, STANDARD_PRECISION);
    const utilisationRate = getPreparedPercentValue(el as unknown as Asset, 'utilization_rate');
    const collateralFactor = convertUnits(el.collateralFactor, STANDARD_PRECISION);
    const liquidationThreshold = convertUnits(
      el.liquidationThreshold,
      // data.globalFactors[0].liquidationThreshold,
      STANDARD_PRECISION,
    );
    const liquidationBonus = convertUnits(
      data.globalFactors[0].liquidationIncentive,
      STANDARD_PRECISION,
    );
    const reserves = convertUnits(el.reserves, STANDARD_PRECISION);
    const reserveFactor = convertUnits(el.reserveFactor, STANDARD_PRECISION);
    const exchangeRate = getPreparedPercentValue(el as unknown as Asset, 'exchange_rate');

    // Interest rate model
    const baseRatePerYear = convertUnits(el.interestModel.rate, STANDARD_PRECISION);
    const multiplierPerYear = convertUnits(el.interestModel.multiplier, STANDARD_PRECISION);
    const jumpMultiplierPerYear = convertUnits(el.interestModel.jumpMultiplier, STANDARD_PRECISION);
    const kink = convertUnits(el.interestModel.kink, STANDARD_PRECISION);

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
        data={preparedData.tokenDetails}
        className={s.tokenDetails}
      />
      <MarketDetails
        asset={preparedData.asset}
        data={preparedData.marketDetails}
      />
      <InterestRateModel
        asset={preparedData.asset}
        data={preparedData.interestRateModel}
      />
    </>
  );
};

export const MarketsDetails: React.FC = () => {
  const { tokenSlug }: { tokenSlug: string } = useParams();
  const yToken = +tokenSlug;

  const { data, error } = useMarketsDetailsQuery({
    variables: {
      yToken,
    },
  });

  if (error || !data || data.asset.length < 1) { // TODO: Add loading to if statement
    return <>404</>;
  }

  return (
    <MarketsDetailsWrapper data={data} />
  );
};

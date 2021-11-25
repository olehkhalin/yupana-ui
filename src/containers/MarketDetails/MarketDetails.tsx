import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getTokenName } from 'utils/getTokenName';
import { Section } from 'components/common/Section';
import { Item } from 'components/common/Item';
import { Heading } from 'components/common/Heading';
import { MARKET_DETAILS_DATA } from 'components/temp-data/market-details';
import { MARKET_DETAILS } from 'constants/popups/market-details';

import s from './MarketDetails.module.sass';

type MarketDetailsProps = {
  className?: string
};

export const MarketDetails: React.FC<MarketDetailsProps> = ({
  className,
}) => {
  const {
    asset: {
      priceInUsd,
      ...tokenMetadata
    },
    availableLiquidity,
    totalBorrowed,
    utilisationRate,
    collateralFactor,
    liquidationThreshold,
    liquidationBonus,
    reserves,
    reserveFactor,
    minted,
    exchangeRate,
  } = useMemo(() => ({
    ...MARKET_DETAILS_DATA,
  }), []);

  const {
    utilizationRate,
    collateralFactor: collateralFactorPopup,
    liquidationBonus: liquidationBonusPopup,
    liquidationThreshold: liquidationThresholdPopup,
    exchangeRate: exchangeRatePopup,
  } = useMemo(
    () => MARKET_DETAILS,
    [],
  );

  return (
    <Section className={cx(s.root, className)}>
      <div className={s.graphWrapper}>
        <div className={s.pieGraph} />

        <div className={s.graphStats}>
          <div className={s.stat}>
            <div className={s.statTitle}>
              Available Liquidity
            </div>

            <div className={s.statValue}>
              {getPrettyAmount({
                value: availableLiquidity / priceInUsd,
                currency: getTokenName(tokenMetadata),
              })}
            </div>
            <div className={s.statValue}>
              {getPrettyAmount({
                value: availableLiquidity,
                currency: '$',
              })}
            </div>
          </div>

          <div className={s.stat}>
            <div className={s.statTitle}>
              Total Borrowed
            </div>

            <div className={s.statValue}>
              {getPrettyAmount({
                value: totalBorrowed / priceInUsd,
                currency: getTokenName(tokenMetadata),
              })}
            </div>
            <div className={s.statValue}>
              {getPrettyAmount({
                value: totalBorrowed,
                currency: '$',
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={s.detailsWrapper}>
        <Heading
          title="Market Details"
          className={s.detailsTitle}
        />
        <div className={s.list}>
          <Item
            text="Utilisation rate"
            value={`${utilisationRate}%`}
            title={utilizationRate.title}
            description={utilizationRate.description}
            className={s.item}
          />
          <Item
            text="Collateral Factor"
            value={`${collateralFactor}%`}
            title={collateralFactorPopup.title}
            description={collateralFactorPopup.description}
            className={s.item}
          />
          <Item
            text="Liquidation threshold"
            value={`${liquidationThreshold}%`}
            title={liquidationThresholdPopup.title}
            description={liquidationThresholdPopup.description}
            className={s.item}
          />
          <Item
            text="Liquidation bonus"
            value={`${liquidationBonus}%`}
            title={liquidationBonusPopup.title}
            description={liquidationBonusPopup.description}
            className={s.item}
          />
          <Item
            text="Reserves"
            value={getPrettyAmount({ value: reserves, currency: '$' })}
            className={s.item}
          />
          <Item
            text="Reserve Factor"
            value={`${reserveFactor}%`}
            className={s.item}
          />
          <Item
            text={`y${tokenMetadata.symbol} Minted`}
            value={getPrettyAmount({ value: minted })}
            className={s.item}
          />
          <Item
            text="Exchange Rate"
            value={`${getPrettyAmount({ value: exchangeRate, currency: `y${tokenMetadata.symbol}` })}`}
            title={exchangeRatePopup.title}
            description={`1 ${getTokenName(tokenMetadata)} = `}
            className={s.item}
          />
        </div>
      </div>
    </Section>
  );
};

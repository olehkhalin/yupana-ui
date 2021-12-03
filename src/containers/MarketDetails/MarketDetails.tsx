import React from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getTokenName } from 'utils/getTokenName';
import { getPrettyPercent } from 'utils/getPrettyPercent';
import { TokenMetadataInterface } from 'types/token';
import { Section } from 'components/common/Section';
import { Item } from 'components/common/Item';
import { Heading } from 'components/common/Heading';

import s from './MarketDetails.module.sass';

type MarketDetailsProps = {
  asset: TokenMetadataInterface
  data: any
  className?: string
};

export const MarketDetails: React.FC<MarketDetailsProps> = ({
  asset,
  data,
  className,
}) => {
  const {
    priceInUsd,
    availableLiquidity,
    totalBorrow,
    utilisationRate,
    collateralFactor,
    liquidationThreshold,
    liquidationBonus,
    reserves,
    reserveFactor,
    minted,
    exchangeRate,
  } = data;

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
                currency: getTokenName(asset),
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
                value: totalBorrow / priceInUsd,
                currency: getTokenName(asset),
              })}
            </div>
            <div className={s.statValue}>
              {getPrettyAmount({
                value: totalBorrow,
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
            value={getPrettyPercent(utilisationRate)}
            className={s.item}
          />
          <Item
            text="Collateral Factor"
            value={getPrettyPercent(collateralFactor)}
            className={s.item}
          />
          <Item
            text="Liquidation threshold"
            value={getPrettyPercent(liquidationThreshold)}
            className={s.item}
          />
          <Item
            text="Liquidation bonus"
            value={getPrettyPercent(liquidationBonus)}
            className={s.item}
          />
          <Item
            text="Reserves"
            value={getPrettyAmount({ value: reserves, currency: '$' })}
            className={s.item}
          />
          <Item
            text="Reserve Factor"
            value={getPrettyPercent(reserveFactor)}
            className={s.item}
          />
          <Item
            text={`y${asset.symbol} Minted`}
            value={getPrettyAmount({ value: minted })}
            className={s.item}
          />
          <Item
            text="Exchange Rate"
            value={`${getPrettyAmount({ value: exchangeRate, currency: `y${asset.symbol}` })}`}
            className={s.item}
          />
        </div>
      </div>
    </Section>
  );
};

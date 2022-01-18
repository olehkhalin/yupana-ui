import React from 'react';
import cx from 'classnames';

import { useCurrency } from 'providers/CurrencyProvider';
import { getPrettyAmount, getPrettyPercent } from 'utils/helpers/amount';
import { getTokenName } from 'utils/helpers/token';
import { TokenMetadataInterface } from 'types/token';
import { Preloader } from 'components/ui/Preloader';
import { Section } from 'components/common/Section';
import { Item } from 'components/common/Item';
import { Heading } from 'components/common/Heading';
import { MARKET_DETAILS } from 'constants/popups/market-details';

import s from './MarketDetails.module.sass';

type MarketDetailsProps = {
  asset: TokenMetadataInterface
  data: any
  loading?: boolean
  className?: string
};

const {
  utilizationRate,
  collateralFactor: collateralFactorPopup,
  liquidationBonus: liquidationBonusPopup,
  liquidationThreshold: liquidationThresholdPopup,
  exchangeRate: exchangeRatePopup,
} = MARKET_DETAILS;

export const MarketDetails: React.FC<MarketDetailsProps> = ({
  asset,
  data,
  loading,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();

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
              {loading ? (
                <Preloader sizeT="medium" theme="primary" />
              ) : getPrettyAmount({
                value: availableLiquidity / priceInUsd,
                currency: getTokenName(asset),
              })}
            </div>
            <div className={s.statValue}>
              {loading ? (
                <Preloader sizeT="medium" theme="primary" />
              ) : convertPriceByBasicCurrency(availableLiquidity)}
            </div>
          </div>

          <div className={s.stat}>
            <div className={s.statTitle}>
              Total Borrowed
            </div>

            <div className={s.statValue}>
              {loading ? (
                <Preloader sizeT="medium" theme="secondary" />
              ) : getPrettyAmount({
                value: totalBorrow / priceInUsd,
                currency: getTokenName(asset),
              })}
            </div>
            <div className={s.statValue}>
              {loading ? (
                <Preloader sizeT="medium" theme="secondary" />
              ) : convertPriceByBasicCurrency(totalBorrow)}
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
            title={utilizationRate.title}
            description={utilizationRate.description}
            loading={loading}
            className={s.item}
          />
          <Item
            text="Collateral Factor"
            value={getPrettyPercent(collateralFactor)}
            title={collateralFactorPopup.title}
            description={collateralFactorPopup.description}
            loading={loading}
            className={s.item}
          />
          <Item
            text="Liquidation threshold"
            value={getPrettyPercent(liquidationThreshold)}
            title={liquidationThresholdPopup.title}
            description={liquidationThresholdPopup.description}
            loading={loading}
            className={s.item}
          />
          <Item
            text="Liquidation bonus"
            value={getPrettyPercent(liquidationBonus)}
            title={liquidationBonusPopup.title}
            description={liquidationBonusPopup.description}
            loading={loading}
            className={s.item}
          />
          <Item
            text="Reserves"
            value={convertPriceByBasicCurrency(reserves)}
            icon={false}
            loading={loading}
            className={s.item}
          />
          <Item
            text="Reserve Factor"
            value={getPrettyPercent(reserveFactor)}
            icon={false}
            loading={loading}
            className={s.item}
          />
          <Item
            text={`y${asset.symbol} Minted`}
            value={getPrettyAmount({ value: minted })}
            icon={false}
            loading={loading}
            className={s.item}
          />
          <Item
            text="Exchange Rate"
            value={`${getPrettyAmount({ value: exchangeRate, currency: `y${asset.symbol}` })}`}
            title={exchangeRatePopup.title}
            description={`1 ${getTokenName(asset)} = `}
            loading={loading}
            className={s.item}
          />
        </div>
      </div>
    </Section>
  );
};

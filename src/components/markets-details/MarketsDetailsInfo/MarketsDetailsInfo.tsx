import React from "react";
import cx from "classnames";
import BigNumber from "bignumber.js";

import { MARKET_DETAILS } from "constants/popups/market-details";
import { getAssetName } from "utils/helpers/asset";
import { getPrettyAmount, getPrettyPercent } from "utils/helpers/amount";
import { AssetType } from "types/asset";
import { Section } from "components/common/Section";
import { Heading } from "components/common/Heading";
import { Item } from "components/markets-details/Item";
import { PrettyAmount } from "components/common/PrettyAmount";

import s from "./MarketsDetailsInfo.module.sass";

const {
  utilizationRate,
  collateralFactor: collateralFactorPopup,
  liquidationBonus: liquidationBonusPopup,
  liquidationThreshold: liquidationThresholdPopup,
  exchangeRate: exchangeRatePopup,
} = MARKET_DETAILS;

type MarketsDetailsInfoProps = {
  asset: AssetType;
  price: BigNumber;
  availableLiquidity: BigNumber;
  totalBorrow: BigNumber;
  utilisationRate: BigNumber;
  collateralFactor: BigNumber;
  liquidationThreshold: BigNumber;
  liquidationBonus: BigNumber;
  reserves: BigNumber;
  reserveFactor: BigNumber;
  minted: BigNumber;
  exchangeRate: BigNumber;
  className?: string;
};

export const MarketsDetailsInfo: React.FC<MarketsDetailsInfoProps> = ({
  asset,
  price,
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
  className,
}) => {
  return (
    <Section className={cx(s.root, className)}>
      <div className={s.graphWrapper}>
        <div className={s.pieGraph} />

        <div className={s.graphStats}>
          <div className={s.stat}>
            <div className={s.statTitle}>Available Liquidity</div>

            <div className={s.statValue}>
              <PrettyAmount
                amount={availableLiquidity}
                currency={getAssetName(asset)}
              />
            </div>
            <div className={s.statValue}>
              <PrettyAmount
                amount={availableLiquidity.multipliedBy(price)}
                isConvertable
              />
            </div>
          </div>

          <div className={s.stat}>
            <div className={s.statTitle}>Total Borrowed</div>

            <div className={s.statValue}>
              <PrettyAmount
                amount={totalBorrow}
                currency={getAssetName(asset)}
              />
            </div>
            <div className={s.statValue}>
              <PrettyAmount
                amount={totalBorrow.multipliedBy(price)}
                isConvertable
              />
            </div>
          </div>
        </div>
      </div>

      <div className={s.detailsWrapper}>
        <Heading title="Market Details" className={s.detailsTitle} />
        <div className={s.list}>
          <Item
            text="Utilisation rate"
            value={getPrettyPercent(utilisationRate)}
            title={utilizationRate.title}
            description={utilizationRate.description}
            className={s.item}
          />
          <Item
            text="Collateral Factor"
            value={getPrettyPercent(collateralFactor)}
            title={collateralFactorPopup.title}
            description={collateralFactorPopup.description}
            className={s.item}
          />
          <Item
            text="Liquidation threshold"
            value={getPrettyPercent(liquidationThreshold)}
            title={liquidationThresholdPopup.title}
            description={liquidationThresholdPopup.description}
            className={s.item}
          />
          <Item
            text="Liquidation bonus"
            value={getPrettyPercent(liquidationBonus)}
            title={liquidationBonusPopup.title}
            description={liquidationBonusPopup.description}
            className={s.item}
          />
          <Item
            text="Reserves"
            value={<PrettyAmount amount={reserves} isConvertable />}
            icon={false}
            className={s.item}
          />
          <Item
            text="Reserve Factor"
            value={getPrettyPercent(reserveFactor)}
            icon={false}
            className={s.item}
          />
          <Item
            text={`y${asset.symbol} Minted`}
            value={<PrettyAmount amount={minted} isConvertable />}
            icon={false}
            className={s.item}
          />
          <Item
            text="Exchange Rate"
            value={`${getPrettyAmount({
              value: exchangeRate,
              currency: `y${asset.symbol}`,
            })}`}
            title={exchangeRatePopup.title}
            description={`1 ${getAssetName(asset)} = ${getPrettyAmount({
              value: exchangeRate,
              currency: `y${asset.symbol}`,
            })}`}
            className={s.item}
          />
        </div>
      </div>
    </Section>
  );
};

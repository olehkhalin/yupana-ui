import React, { FC } from "react";
import cx from "classnames";

import { MARKET_DETAILS } from "constants/popups/market-details";
import { Preloader } from "components/ui/Preloader";
import { Section } from "components/common/Section";
import { Heading } from "components/common/Heading";
import { Item } from "components/markets-details/Item";

import s from "./MarketsDetailsInfo.module.sass";

const {
  utilizationRate,
  collateralFactor: collateralFactorPopup,
  liquidationBonus: liquidationBonusPopup,
  liquidationThreshold: liquidationThresholdPopup,
} = MARKET_DETAILS;

const ItemsArray = [
  {
    text: "Utilisation rate",
    title: utilizationRate.title,
    description: utilizationRate.description,
  },
  {
    text: "Collateral Factor",
    title: collateralFactorPopup.title,
    description: collateralFactorPopup.description,
  },
  {
    text: "Liquidation threshold",
    title: liquidationThresholdPopup.title,
    description: liquidationThresholdPopup.description,
  },
  {
    text: "Liquidation bonus",
    title: liquidationBonusPopup.title,
    description: liquidationBonusPopup.description,
  },
  { text: "Reserves" },
  { text: "Reserve Factor" },
  { text: "yToken Minted" },
  { text: "Exchange Rate" },
];

type MarketsDetailsInfoLoadingProps = {
  className?: string;
};

export const MarketsDetailsInfoLoading: FC<MarketsDetailsInfoLoadingProps> = ({
  className,
}) => {
  return (
    <Section className={cx(s.root, className)}>
      <div className={s.graphWrapper}>
        <div className={cx(s.pieGraph, s.pieLoading)}>
          <Preloader sizeT="fluent" theme="tertiary" />
        </div>

        <div className={s.graphStats}>
          <div className={s.stat}>
            <div className={s.statTitle}>Available Liquidity</div>

            <div className={s.statValue}>
              <Preloader sizeT="medium" theme="primary" />
            </div>
            <div className={s.statValue}>
              <Preloader sizeT="medium" theme="primary" />
            </div>
          </div>

          <div className={s.stat}>
            <div className={s.statTitle}>Total Borrowed</div>

            <div className={s.statValue}>
              <Preloader sizeT="medium" theme="secondary" />
            </div>
            <div className={s.statValue}>
              <Preloader sizeT="medium" theme="secondary" />
            </div>
          </div>
        </div>
      </div>

      <div className={s.detailsWrapper}>
        <Heading title="Market Details" className={s.detailsTitle} />
        <div className={s.list}>
          {ItemsArray.map(({ text, title, description }) => (
            <Item
              key={text}
              text={text}
              value={""}
              title={title}
              description={description}
              icon={!!title && !!description}
              loading
              className={s.item}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

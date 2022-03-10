import React, { FC } from "react";
import cx from "classnames";
import BigNumber from "bignumber.js";

import { getPrettyAmount, getPrettyPercent } from "utils/helpers/amount";
import { getAssetName } from "utils/helpers/asset";
import { AssetType } from "types/asset";
import { Section } from "components/common/Section";
import { Item } from "components/markets-details/Item";
import { Heading } from "components/common/Heading";
import { INTEREST_RATE_MODEL } from "constants/popups/interest-rate-model";

import { InterestRateModelChart } from "./InterestRateModelChart";
import s from "./InterestRateModel.module.sass";

const { baseRatePerYear: baseRatePerYearPopup, kink: kinkPopup } =
  INTEREST_RATE_MODEL;

export type InterestRateModelBase = {
  currentUtilizationRate: BigNumber;
  baseRatePerYear: BigNumber;
  multiplierPerYear: BigNumber;
  jumpMultiplierPerYear: BigNumber;
  kink: BigNumber;
  reserveFactor: BigNumber;
};

type InterestRateModelProps = InterestRateModelBase & {
  asset: AssetType;
  className?: string;
};

export const InterestRateModel: FC<InterestRateModelProps> = ({
  asset,
  currentUtilizationRate,
  baseRatePerYear,
  multiplierPerYear,
  jumpMultiplierPerYear,
  kink,
  reserveFactor,
  className,
}) => {
  return (
    <Section className={cx(s.root, className)}>
      <div className={s.detailsWrapper}>
        <Heading
          title="Interest Rate Model"
          link={{
            label: "IRM in docs",
            link: "/",
          }}
          theme="secondary"
          className={s.detailsTitle}
        />
        <div className={s.tokenName}>
          {getAssetName(asset, false, true)}
          <div className={s.modelTitle}>Jump rate model</div>
        </div>
        <div className={s.list}>
          <Item
            text="Current Util. rate"
            value={getPrettyPercent(currentUtilizationRate)}
            theme="secondary"
            icon={false}
            className={s.item}
          />
          <Item
            text="Base rate per year"
            value={getPrettyPercent(baseRatePerYear)}
            title={baseRatePerYearPopup.title}
            description={baseRatePerYearPopup.description}
            theme="secondary"
            className={s.item}
          />
          <Item
            text="Multiplier per year"
            value={getPrettyAmount({
              value: multiplierPerYear.decimalPlaces(6),
            })} // TODO: Research
            theme="secondary"
            icon={false}
            className={s.item}
          />
          <Item
            text="Jump multiplier per year"
            value={getPrettyAmount({
              value: jumpMultiplierPerYear.decimalPlaces(6),
            })} // TODO: Research
            theme="secondary"
            icon={false}
            className={s.item}
          />
          <Item
            text="Kink"
            value={getPrettyPercent(kink)}
            title={kinkPopup.title}
            description={kinkPopup.description}
            theme="secondary"
            className={s.item}
          />
        </div>
      </div>

      <div className={s.chartWrapper}>
        <InterestRateModelChart
          currentUtilizationRate={currentUtilizationRate}
          baseRatePerYear={baseRatePerYear}
          multiplierPerYear={multiplierPerYear}
          jumpMultiplierPerYear={jumpMultiplierPerYear}
          kink={kink}
          reserveFactor={reserveFactor}
        />
      </div>
    </Section>
  );
};

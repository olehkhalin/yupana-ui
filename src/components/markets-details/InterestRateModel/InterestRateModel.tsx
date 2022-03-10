import React, { FC } from "react";
import cx from "classnames";
import BigNumber from "bignumber.js";

import { DOCS_LINKS } from "constants/docs";
import { getPrettyPercent } from "utils/helpers/amount";
import { getAssetName } from "utils/helpers/asset";
import { AssetType } from "types/asset";
import { PrettyAmount } from "components/common/PrettyAmount";
import { Section } from "components/common/Section";
import { Item } from "components/markets-details/Item";
import { Heading } from "components/common/Heading";
import { INTEREST_RATE_MODEL } from "constants/popups/interest-rate-model";

import s from "./InterestRateModel.module.sass";

const { baseRatePerYear: baseRatePerYearPopup, kink: kinkPopup } =
  INTEREST_RATE_MODEL;

type InterestRateModelProps = {
  asset: AssetType;
  currentUtilizationRate: BigNumber;
  baseRatePerYear: BigNumber;
  multiplierPerYear: BigNumber;
  jumpMultiplierPerYear: BigNumber;
  kink: BigNumber;
  className?: string;
};

export const InterestRateModel: FC<InterestRateModelProps> = ({
  asset,
  currentUtilizationRate,
  baseRatePerYear,
  multiplierPerYear,
  jumpMultiplierPerYear,
  kink,
  className,
}) => {
  return (
    <Section className={cx(s.root, className)}>
      <div className={s.detailsWrapper}>
        <Heading
          title="Interest Rate Model"
          link={{
            label: "IRM in docs",
            link: DOCS_LINKS.irm,
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
            value={<PrettyAmount amount={baseRatePerYear} size="extraSmall" />}
            title={baseRatePerYearPopup.title}
            description={baseRatePerYearPopup.description}
            theme="secondary"
            className={s.item}
          />
          <Item
            text="Multiplier per year"
            value={
              <PrettyAmount amount={multiplierPerYear} size="extraSmall" />
            }
            theme="secondary"
            icon={false}
            className={s.item}
          />
          <Item
            text="Jump multiplier per year"
            value={
              <PrettyAmount amount={jumpMultiplierPerYear} size="extraSmall" />
            }
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

      <div className={s.graphWrapper} />
    </Section>
  );
};

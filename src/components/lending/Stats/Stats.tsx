import React, { FC } from "react";
import { useReactiveVar } from "@apollo/client";
import BigNumber from "bignumber.js";

import { COLLATERAL_PRECISION, STANDARD_PRECISION } from "constants/defaults";
import { globalVariablesVar } from "utils/cache";
import { convertUnits } from "utils/helpers/amount";
import { TooltipCategoryEnum } from "components/common/AttentionText";

import { UserStats } from "./UserStats";
import { LimitLine } from "./LimitLine";
import s from "./Stats.module.sass";

const prettyRatio = (collateral: BigNumber, outstandingBorrow: BigNumber) =>
  collateral.gt(0) && outstandingBorrow.gt(0)
    ? convertUnits(
        outstandingBorrow
          .multipliedBy(new BigNumber(10).pow(STANDARD_PRECISION))
          .idiv(collateral),
        STANDARD_PRECISION
      ).multipliedBy(1e2)
    : new BigNumber(0);

type StatsProps = {
  className?: string;
};

export const Stats: FC<StatsProps> = ({ className }) => {
  const { maxCollateral, outstandingBorrow, liquidationCollateral, isLoaded } =
    useReactiveVar(globalVariablesVar);

  const liquidationPercent = prettyRatio(
    liquidationCollateral,
    outstandingBorrow
  );

  return (
    <section className={className}>
      <UserStats className={s.stat} />
      <LimitLine
        percent={prettyRatio(maxCollateral, outstandingBorrow)}
        value={convertUnits(maxCollateral, COLLATERAL_PRECISION)}
        title="Your Borrow Limit"
        text="Your Borrow Limit"
        name="your_borrow_limit"
        category={TooltipCategoryEnum.LENDING}
        description="A maximum loan amount, or loan limit, describes the total amount of money that an applicant is authorized to borrow."
        theme="secondary"
        loading={!isLoaded}
        className={s.limit}
      />
      <LimitLine
        percent={liquidationPercent}
        value={convertUnits(liquidationCollateral, COLLATERAL_PRECISION)}
        title={
          liquidationPercent.gt(100)
            ? "You are in the Liquidation Risk"
            : "Your Liquidation Limit"
        }
        text={
          liquidationPercent.gt(100)
            ? "You are in the Liquidation Risk"
            : "Your Liquidation Limit"
        }
        name="your_liquidation_limit"
        category={TooltipCategoryEnum.LENDING}
        description="The maximum loan amount, or credit limit, describes the total amount of money after which the borrower will be liquidated."
        theme="secondary"
        loading={!isLoaded}
        className={s.limit}
      />
    </section>
  );
};

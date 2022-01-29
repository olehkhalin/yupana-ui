import React from "react";
import { useReactiveVar } from "@apollo/client";
import BigNumber from "bignumber.js";

import { STANDARD_PRECISION } from "constants/defaults";
import { globalVariablesVar } from "utils/cache";

import { UserStats } from "./UserStats";
import { LimitLine } from "./LimitLine";
import s from "./Stats.module.sass";

type StatsProps = {
  className?: string;
};

export const Stats: React.FC<StatsProps> = ({ className }) => {
  const globalVariables = useReactiveVar(globalVariablesVar);

  return (
    <section className={className}>
      <UserStats className={s.stat} />
      <LimitLine
        percent={
          globalVariables.outstandingBorrow.gt(0)
            ? globalVariables.maxCollateral
                .multipliedBy(STANDARD_PRECISION)
                .div(globalVariables.outstandingBorrow)
            : new BigNumber(0)
        }
        value={globalVariables.maxCollateral}
        title="Your Borrow Limit"
        text="Your Borrow Limit"
        description="A maximum loan amount, or loan limit, describes the total amount of money that an applicant is authorized to borrow."
        theme="secondary"
        className={s.limit}
      />
      <LimitLine
        percent={
          globalVariables.outstandingBorrow.gt(0)
            ? globalVariables.maxCollateral
                .multipliedBy(STANDARD_PRECISION)
                .div(globalVariables.outstandingBorrow)
            : new BigNumber(0)
        }
        value={globalVariables.maxCollateral}
        title="Your Liquidation Limit"
        text="Your Liquidation Limit"
        description="The maximum loan amount, or credit limit, describes the total amount of money after which the borrower will be liquidated."
        theme="secondary"
        className={s.limit}
      />
    </section>
  );
};

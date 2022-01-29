import React, { FC } from "react";
import cx from "classnames";

import { COLLATERAL_PRECISION, STANDARD_PRECISION } from "constants/defaults";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { useUserStats } from "hooks/useUserStats";
import { Preloader } from "components/ui/Preloader";
import { PrettyAmount } from "components/common/PrettyAmount";

import s from "./UserStats.module.sass";

type UserStatsProps = {
  className?: string;
};

export const UserStats: FC<UserStatsProps> = ({ className }) => {
  const { data, loading, error } = useUserStats();

  if ((!data && !loading) || error) {
    return <></>;
  }

  return (
    <div className={cx(s.root, className)}>
      <div className={s.item}>
        <div className={s.title}>Your Supply Balance:</div>
        <div className={s.value}>
          {loading || !data ? (
            <Preloader />
          ) : (
            <PrettyAmount
              amount={convertUnits(
                data.totalSupplyUsd,
                COLLATERAL_PRECISION
              ).decimalPlaces(2)}
              isConvertable
              className={s.supplyValue}
            />
          )}
        </div>
      </div>

      <div className={s.item}>
        <div className={s.title}>Net APY:</div>
        <div className={s.value}>
          {loading || !data ? (
            <Preloader />
          ) : (
            getPrettyPercent(
              convertUnits(data.netApy, STANDARD_PRECISION).multipliedBy(1e2)
            )
          )}
        </div>
      </div>

      <div className={s.item}>
        <div className={s.title}>Your Borrow Balance:</div>
        <div className={s.value}>
          {loading || !data ? (
            <Preloader />
          ) : (
            <PrettyAmount
              amount={convertUnits(
                data.totalBorrowUsd,
                COLLATERAL_PRECISION
              ).decimalPlaces(2)}
              isConvertable
              className={s.borrowValue}
            />
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useMemo, FC } from "react";
import CountUp from "react-countup";
import cx from "classnames";

import { getAssetName, getSlice } from "utils/helpers/asset";
import { ANIMATION_TIME } from "constants/defaults";
import { ProgressBar } from "components/ui/ProgressBar";

import { SupplyLineWithDataProps } from "./supply-line";
import s from "./SupplyLine.module.sass";

export const SupplyLine: FC<SupplyLineWithDataProps> = ({
  asset,
  percent,
  theme = "primary",
  className,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const timing = useMemo(() => ANIMATION_TIME + amount / 100, [amount]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (percent) {
      timeout = setTimeout(() => setAmount(percent), 500);
    }
    return () => clearTimeout(timeout);
  }, [percent]);

  return (
    <div className={cx(s.root, className)}>
      <div className={s.content}>
        <div className={s.symbol}>{getSlice(getAssetName(asset), 5)}</div>

        <div className={s.percent}>
          <>
            <CountUp start={0} end={amount} decimals={2} duration={timing} /> %
          </>
        </div>
      </div>

      <ProgressBar theme={theme} amount={amount} timing={timing} />
    </div>
  );
};

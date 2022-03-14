import React, { useState, useEffect, useMemo, FC } from "react";
import CountUp from "react-countup";
import BigNumber from "bignumber.js";
import cx from "classnames";

import { ANIMATION_TIME } from "constants/defaults";
import { ProgressBar } from "components/ui/ProgressBar";
import { AttentionText, ModalContent } from "components/common/AttentionText";
import { PrettyAmount } from "components/common/PrettyAmount";

import s from "./LimitLine.module.sass";
import { Preloader } from "../../../ui/Preloader";

type LimitLineProps = {
  text: string;
  percent: BigNumber;
  value: BigNumber;
  theme: "primary" | "secondary";
  loading: boolean;
  className?: string;
} & ModalContent;

export const LimitLine: FC<LimitLineProps> = ({
  text,
  percent,
  value,
  title,
  description,
  buttonText,
  theme,
  loading,
  className,
}) => {
  const isInRisk = percent.decimalPlaces(2).gt(100);

  const [percentValue, setPercentValue] = useState<number>(0);
  const timing = useMemo(
    () => ANIMATION_TIME + (isInRisk ? 100 : +percent) / 100,
    [isInRisk, percent]
  );

  useEffect(() => {
    if (percent) {
      setPercentValue(isInRisk ? 100 : +percent);
    }
  }, [isInRisk, percent]);

  return (
    <div className={cx(s.root, className)}>
      <div className={s.content}>
        <div className={s.percent}>
          <CountUp start={0} end={+percent} decimals={2} duration={timing} />%
        </div>

        <div className={s.title}>
          {loading ? (
            <Preloader
              theme="secondary"
              className={cx(s.preloader, s.textPreloader)}
            />
          ) : (
            <AttentionText
              text={text}
              title={title}
              description={description}
              buttonText={buttonText}
              theme={theme}
              className={s.title}
            />
          )}
        </div>

        <div className={s.value}>
          <PrettyAmount amount={value} isConvertable />
        </div>
      </div>

      <ProgressBar
        amount={percentValue}
        timing={timing}
        theme={isInRisk ? "warning" : theme}
      />
    </div>
  );
};

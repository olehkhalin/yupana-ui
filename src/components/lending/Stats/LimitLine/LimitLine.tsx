import React, { useState, useEffect, useMemo } from "react";
import CountUp from "react-countup";
import BigNumber from "bignumber.js";
import cx from "classnames";

import { ANIMATION_TIME } from "constants/defaults";
import { ProgressBar } from "components/ui/ProgressBar";
import { AttentionText, ModalContent } from "components/common/AttentionText";
import { PrettyAmount } from "components/common/PrettyAmount";

import s from "./LimitLine.module.sass";

type LimitLineProps = {
  text: string;
  percent: BigNumber;
  value: BigNumber;
  theme: "primary" | "secondary";
  className?: string;
} & ModalContent;

export const LimitLine: React.FC<LimitLineProps> = ({
  text,
  percent,
  value,
  title,
  description,
  buttonText,
  theme,
  className,
}) => {
  const [percentValue, setPercentValue] = useState<number>(0);
  const timing = useMemo(() => ANIMATION_TIME + +percent / 100, [percent]);

  useEffect(() => {
    if (percent) {
      setPercentValue(+percent);
    }
  }, [percent]);

  return (
    <div className={cx(s.root, className)}>
      <div className={s.content}>
        <div className={s.percent}>
          <CountUp start={0} end={+percent} decimals={2} duration={timing} />%
        </div>

        <div className={s.title}>
          <AttentionText
            text={text}
            title={title}
            description={description}
            buttonText={buttonText}
            theme={theme}
            className={s.title}
          />
        </div>

        <div className={s.value}>
          <PrettyAmount amount={value} isConvertable />
        </div>
      </div>

      <ProgressBar amount={percentValue} timing={timing} theme={theme} />
    </div>
  );
};

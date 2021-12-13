import React, { useState, useEffect, useMemo } from 'react';
import CountUp from 'react-countup';
import cx from 'classnames';

import { ANIMATION_TIME } from 'constants/default';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { ProgressBar } from 'components/ui/ProgressBar';
import { AttentionText } from 'components/common/AttentionText';

import s from './LimitLine.module.sass';

type LimitLineProps = {
  text?: string
  percent: number
  value: number
  title?: string
  description?: string
  theme?: 'primary' | 'secondary' | 'tertiary'
  className?: string
};

export const LimitLine: React.FC<LimitLineProps> = ({
  text,
  percent,
  value,
  title,
  description,
  theme,
  className,
}) => {
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setAmount(percent);
    }, 1000);
  }, [percent]);

  const timing = useMemo(() => ANIMATION_TIME + (amount / 100), [amount]);

  return (
    <div className={cx(s.root, className)}>
      <div className={s.content}>
        <div className={s.percent}>
          <CountUp
            start={0}
            end={amount}
            decimals={2}
            duration={timing}
          />
          %
        </div>

        <div className={s.title}>
          <AttentionText
            text={text}
            title={title}
            description={description}
            theme={theme}
          />
        </div>

        <div className={s.value}>
          {getPrettyAmount({ value, currency: '$' })}
        </div>
      </div>

      <ProgressBar
        amount={amount}
        timing={timing}
        theme="secondary"
      />
    </div>
  );
};

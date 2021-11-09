import React, { useState, useEffect, useMemo } from 'react';
import CountUp from 'react-countup';
import cx from 'classnames';

import { ANIMATION_TIME } from 'constants/default';
import { ProgressBar } from 'components/ui/ProgressBar';
import { ReactComponent as Attention } from 'svg/Attention.svg';

import s from './LimitLine.module.sass';

type LimitLineProps = {
  percent: number
  value: string
  title: string
  className?: string
};

export const LimitLine: React.FC<LimitLineProps> = ({
  percent,
  value,
  title,
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
          {title}
          <Attention className={s.attention} />
        </div>

        <div className={s.value}>
          {`$ ${value}`}
        </div>
      </div>

      <ProgressBar
        amount={amount}
        timing={timing}
      />
    </div>
  );
};
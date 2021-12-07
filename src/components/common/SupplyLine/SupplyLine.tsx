import React, { useState, useEffect, useMemo } from 'react';
import CountUp from 'react-countup';
import cx from 'classnames';

import { TokenMetadataInterface } from 'types/token';
import { getTokenName } from 'utils/getTokenName';
import { getSlice } from 'utils/getSlice';
import { ANIMATION_TIME } from 'constants/default';
import { ProgressBar, themeClass } from 'components/ui/ProgressBar';
import { Preloader } from 'components/ui/Preloader';

import s from './SupplyLine.module.sass';

type SupplyLineProps = {
  token: TokenMetadataInterface
  percent: number
  loading?: any
  theme?: keyof typeof themeClass
  className?: string
};

export const SupplyLine: React.FC<SupplyLineProps> = ({
  token,
  percent,
  loading,
  theme = 'primary',
  className,
}) => {
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAmount(percent);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [percent]);

  const timing = useMemo(() => ANIMATION_TIME + (amount / 100), [amount]);

  return (
    <div className={cx(s.root, className)}>
      <div className={s.content}>
        <div className={s.symbol}>
          {getSlice(getTokenName(token), 5)}
        </div>

        <div className={s.percent}>
          {!loading ? (
            <CountUp
              start={0}
              end={amount}
              decimals={2}
              duration={timing}
            /> // %
          ) : (
            <Preloader />
          )}
        </div>
      </div>

      <ProgressBar
        theme={theme}
        amount={amount}
        timing={timing}
      />
    </div>
  );
};

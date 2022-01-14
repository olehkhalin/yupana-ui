import React, { useState, useEffect, useMemo } from 'react';
import CountUp from 'react-countup';
import cx from 'classnames';

import { TokenMetadataInterface } from 'types/token';
import { getTokenName, getSlice } from 'utils/helpers/token';
import { ANIMATION_TIME } from 'constants/default';
import { ProgressBar, themeClass } from 'components/ui/ProgressBar';
import { Preloader } from 'components/ui/Preloader';

import s from './SupplyLine.module.sass';

type SupplyLineProps = {
  token: TokenMetadataInterface
  percent: number
  loading?: boolean
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
  const timing = useMemo(() => ANIMATION_TIME + (amount / 100), [amount]);

  useEffect(() => {
    if (!loading) {
      setAmount(percent);
    }
  }, [loading, percent]);

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
            />
          ) : (
            <Preloader
              className={s.percentPreloader}
            />
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

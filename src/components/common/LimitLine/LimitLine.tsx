import React, { useMemo, useState, useEffect } from 'react';
import CountUp from 'react-countup';
import cx from 'classnames';

import { ANIMATION_TIME } from 'constants/default';
import { useCurrency } from 'providers/CurrencyProvider';
import { Button } from 'components/ui/Button';
import { Preloader } from 'components/ui/Preloader';
import { ProgressBar } from 'components/ui/ProgressBar';
import { ReactComponent as Attention } from 'svg/Attention.svg';

import s from './LimitLine.module.sass';

type LimitLineProps = {
  percent: number | undefined
  value: number | undefined
  title: string
  loading: boolean
  className?: string
};

export const LimitLine: React.FC<LimitLineProps> = ({
  percent,
  value,
  title,
  loading,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();
  const [percentValue, setPercentValue] = useState<number>(0);
  const timing = useMemo(() => ANIMATION_TIME + ((percent ?? 1) / 100), [percent]);

  useEffect(() => {
    if (!loading && percent) {
      setPercentValue(percent);
    }
  }, [loading, percent]);

  return (
    <div className={cx(s.root, className)}>
      <div className={s.content}>
        <div className={s.percent}>
          {!loading && percent ? (
            <>
              <CountUp
                start={0}
                end={percent}
                decimals={2}
                duration={timing}
              />
              %
            </>
          ) : (
            <Preloader
              theme="tertiary"
              className={s.preloader}
            />
          )}
        </div>

        <div className={s.title}>
          {title}
          <Button
            theme="clear"
            className={s.attention}
          >
            <Attention className={s.icon} />
          </Button>
        </div>

        <div className={s.value}>
          {!loading && value
            ? convertPriceByBasicCurrency(value)
            : (
              <Preloader
                theme="tertiary"
                className={s.preloader}
              />
            )}
        </div>
      </div>

      <ProgressBar
        amount={percentValue}
        timing={timing}
        theme="secondary"
      />
    </div>
  );
};

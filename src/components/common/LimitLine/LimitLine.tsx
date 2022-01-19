import React, { useState, useEffect, useMemo } from 'react';
import CountUp from 'react-countup';
import cx from 'classnames';

import { ANIMATION_TIME } from 'constants/default';
import { useCurrency } from 'providers/CurrencyProvider';
import { Preloader } from 'components/ui/Preloader';
import { ProgressBar } from 'components/ui/ProgressBar';
import { AttentionText, ModalContent } from 'components/common/AttentionText';

import s from './LimitLine.module.sass';

type LimitLineProps = {
  text?: string
  percent: number | undefined
  value: number | undefined
  theme?: 'primary' | 'secondary'
  loading: boolean
  className?: string
} & ModalContent;

export const LimitLine: React.FC<LimitLineProps> = ({
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
        theme={theme}
      />
    </div>
  );
};

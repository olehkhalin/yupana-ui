import React, { useMemo } from 'react';
import CountUp from 'react-countup';
import cx from 'classnames';

import { ANIMATION_TIME } from 'constants/default';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { Button } from 'components/ui/Button';
import { ProgressBar } from 'components/ui/ProgressBar';
import { Preloader } from 'components/ui/Preloader';
import { ReactComponent as Attention } from 'svg/Attention.svg';

import s from './LimitLine.module.sass';

type LimitLineProps = {
  percent: number
  value: number
  title: string
  className?: string
};

export const LimitLine: React.FC<LimitLineProps> = ({
  percent,
  value,
  title,
  className,
}) => {
  const timing = useMemo(() => ANIMATION_TIME + (percent / 100), [percent]);

  const [isTrue, setIsTrue] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsTrue(true), 3000);
  });

  return (
    <div className={cx(s.root, className)}>
      <div className={s.content}>
        <div className={s.percent}>
          {isTrue ? (
            <>
              <CountUp
                start={0}
                end={percent}
                decimals={2}
                duration={timing}
              />
              %
            </>
          )
            : <Preloader />}
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
          {isTrue
            ? getPrettyAmount({ value, currency: '$' })
            : <Preloader />}
        </div>
      </div>

      <ProgressBar
        amount={percent}
        timing={timing}
        theme="secondary"
      />
    </div>
  );
};

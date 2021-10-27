/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import cx from 'classnames';

import { ANIMATION_TIME } from 'constants/default';
import { ReactComponent as Attention } from 'svg/Attention.svg';

import s from './LimitLine.module.sass';

type MokeType = {
  percent: number
  value: string
  title: string
};

type LimitLineProps = {
  data: MokeType
  className?: string
};

export const LimitLine: React.FC<LimitLineProps> = ({
  data: {
    percent,
    value,
    title,
  },
  className,
}) => {
  const [currentLimit, setCurrentLimit] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setCurrentLimit(percent);
    }, 1000);
  }, [percent]);

  const timing = useMemo(() => ANIMATION_TIME + (currentLimit / 100), [currentLimit]);

  return (
    <div className={cx(s.root, className)}>
      <div className={s.content}>
        <div className={s.percent}>
          {`${percent}%`}
        </div>

        <div className={s.title}>
          {title}
          <Attention className={s.attention} />
        </div>

        <div className={s.value}>
          {`$ ${value}`}
        </div>
      </div>

      <div className={s.line}>
        <div
          style={{ width: `calc(${currentLimit}% - 2px)`, transition: `width ${timing}s` }}
          className={s.layout}
        />
      </div>
    </div>
  );
};

import React, { LegacyRef } from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';
import { SLIDER_PERCENTS } from 'constants/slider';

import s from './Slider.module.sass';

type SliderProps = {
  theme?: keyof typeof themeClasses
  percents?: number[]
  handleClickByPercentButton?: (arg: number) => void
  valueRef: LegacyRef<HTMLDivElement>
  className?: string
} & React.HTMLProps<HTMLInputElement>;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const Slider: React.FC<SliderProps> = ({
  theme = 'primary',
  percents = SLIDER_PERCENTS,
  handleClickByPercentButton,
  valueRef,
  className,
  value,
  ...props
}) => (
  <div className={cx(s.root, themeClasses[theme], className)}>
    <div className={s.number} ref={valueRef}>
      {Number(value).toFixed(2)}
      %
    </div>

    <input
      type="range"
      step="0.01"
      value={value}
      className={cx(s.slider, className)}
      {...props}
    />

    <div className={s.percents}>
      {
        percents.map((amount) => (
          <Button
            key={amount}
            theme="clear"
            onClick={() => handleClickByPercentButton?.(amount)}
            className={s.percent}
          >
            {`${amount} %`}
          </Button>
        ))
      }
    </div>
  </div>
);

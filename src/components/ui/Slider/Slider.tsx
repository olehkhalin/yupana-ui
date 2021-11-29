import React from 'react';
import cx from 'classnames';

import { getUniqueKey } from 'utils/getUniqueKey';
import { Button } from 'components/ui/Button';
import { SLIDER_PERCENTS } from 'constants/slider';

import s from './Slider.module.sass';

type SliderProps = {
  theme?: keyof typeof themeClass
  percents?: number[]
  handlePercent?: (event: React.ChangeEvent<HTMLInputElement>, arg: number) => void
  valueRef: any
  sliderClassName?: string
  className?: string
} & React.HTMLProps<HTMLInputElement>;

const themeClass = {
  primary: s.primary,
  secondary: s.secondary,
};

export const Slider: React.FC<SliderProps> = ({
  theme = 'primary',
  percents = SLIDER_PERCENTS,
  handlePercent,
  sliderClassName,
  valueRef,
  className,
  value,
  ...props
}) => (
  <div className={cx(s.root, themeClass[theme])}>
    <div className={cx(s.number, sliderClassName)} ref={valueRef}>
      {value}
      %
    </div>
    <input
      type="range"
      step="1"
      className={cx(s.slider, sliderClassName)}
      value={value}
      {...props}
    />
    <div className={s.percents}>
      {
        percents.map((amount) => (
          <Button
            key={getUniqueKey()}
            theme="clear"
            onClick={(event: any) => handlePercent?.(event, amount)}
            className={s.percent}
          >
            {`${amount} %`}
          </Button>
        ))
      }
    </div>
  </div>
);

import React from 'react';
import cx from 'classnames';

import { getUniqueKey } from 'utils/getUniqueKey';
import { Button } from 'components/ui/Button';
import { SLIDER_PERCENTS } from 'constants/slider';

import s from './Slider.module.sass';

type SliderProps = {
  percents?: number[]
  handlePercent?: (arg: number) => void
  sliderClassName?: string
  className?: string
} & React.HTMLProps<HTMLInputElement>;

export const Slider: React.FC<SliderProps> = ({
  percents = SLIDER_PERCENTS,
  handlePercent,
  sliderClassName,
  className,
  ...props
}) => (
  <div className={cx(s.root, className)}>
    <input
      type="range"
      step="1"
      className={cx(s.slider, sliderClassName)}
      {...props}
    />

    <div className={s.percents}>
      {
        percents.map((amount) => (
          <Button
            key={getUniqueKey()}
            theme="clear"
            onClick={() => handlePercent?.(amount)}
            className={s.percent}
          >
            {`${amount} %`}
          </Button>
        ))
      }
    </div>
  </div>
);

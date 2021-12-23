import React from 'react';
import cx from 'classnames';
import BigNumber from 'bignumber.js';

import { SLIDER_PERCENTS } from 'constants/slider';
import { Button } from 'components/ui/Button';

import s from './Slider.module.sass';

type SliderProps = Omit<React.HTMLProps<HTMLInputElement>, 'type' | 'onChange' | 'value'> & {
  theme?: keyof typeof themeClasses
  value?: string
  maxValue: BigNumber
  className?: string
  onChange: (newValue: BigNumber) => void
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const Slider: React.FC<SliderProps> = ({
  theme = 'primary',
  value = '0',
  maxValue,
  className,
  onChange,
  ...props
}) => {
  const percent = ((+value) / (+maxValue)) * 100;
  const finalPercent = percent > 100 ? 100 : percent;

  const handleClickByPercentButton = (newPercent: any) => {
    const numVal = new BigNumber(maxValue ? maxValue.multipliedBy(newPercent).div(1e2) : 0);
    onChange(numVal);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(new BigNumber(event.target.value));
  };

  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.number} style={{ left: `${finalPercent / 1.1}%` }}>
        {finalPercent.toFixed(2)}
        %
      </div>
      <input
        type="range"
        step="0.01"
        value={value || 0}
        className={cx(s.slider, themeClasses[theme], className)}
        max={+(maxValue ?? 1)}
        onChange={handleInputChange}
        {...props}
      />

      <div className={s.percents}>
        {
          SLIDER_PERCENTS.map((amount) => (
            <Button
              key={amount}
              theme="clear"
              onClick={() => handleClickByPercentButton(amount)}
              className={s.percent}
            >
              {`${amount} %`}
            </Button>
          ))
        }
      </div>
    </div>
  );
};

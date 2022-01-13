import React, {
  useCallback, useState, useMemo,
} from 'react';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { Button } from 'components/ui/Button';
import { Slider } from 'components/ui/Slider';

import s from './NumberInput.module.sass';

const convertValueToCurrency = (val: BigNumber, exchangeRate: BigNumber) => (
  val
    ? val.multipliedBy(exchangeRate)
    : new BigNumber(0)
);

type NumberInputProps = Omit<React.HTMLProps<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'min' | 'max'> & {
  decimals: number
  min?: number | BigNumber
  max?: number | BigNumber
  error?: string
  theme?: keyof typeof themeClasses
  value?: BigNumber
  maxValue?: BigNumber
  onChange?: (newValue: BigNumber) => void
  withSlider?: boolean
  setFocus: () => void
  className?: string
  exchangeRate: BigNumber
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(({
  decimals,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  error,
  theme = 'primary',
  value,
  maxValue,
  onChange,
  withSlider = true,
  setFocus,
  className,
  exchangeRate,
  ...props
}, ref) => {
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);

  const valueStr = useMemo(() => (value !== undefined ? value.toString() : ''), [value]);
  const [localValue, setLocalValue] = useState(valueStr);

  const [valueInBaseCurrency, setValueInBaseCurrency] = useState(new BigNumber(0));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value.replace(/ /g, '').replace(/,/g, '.');

      let numVal = new BigNumber(val || 0);
      const indexOfDot = val.indexOf('.');
      if (indexOfDot !== -1 && val.length - indexOfDot > decimals + 1) {
        val = val.substring(0, indexOfDot + decimals + 1);
        numVal = new BigNumber(val);
      }

      if (numVal.isNaN() || (numVal.lt(min) || numVal.gt(max))) {
        return;
      }

      onChange?.(val !== '' ? numVal : new BigNumber(0));
      setLocalValue(val);
      setValueInBaseCurrency(convertValueToCurrency(
        numVal ?? new BigNumber(0),
        exchangeRate,
      ));
    },
    [decimals, min, max, onChange, exchangeRate],
  );

  // Get user balance by token
  const handleMax = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();

    onChange?.(maxValue ?? new BigNumber(0));
    setLocalValue(maxValue !== undefined ? maxValue.toFixed() : '');
    setValueInBaseCurrency(convertValueToCurrency(
      maxValue ?? new BigNumber(0),
      exchangeRate,
    ));
  }, [exchangeRate, maxValue, onChange]);

  const handleSliderChange = (val: BigNumber) => {
    onChange?.(val);
    setLocalValue(val.toFixed());
    setValueInBaseCurrency(convertValueToCurrency(
      val,
      exchangeRate,
    ));
  };

  return (
    <div className={cx(s.root, className)}>
      <div className={s.inputWrapper}>
        <div
          onClick={setFocus}
          className={cx(s.container, themeClasses[theme], { [s.error]: error })}
        >
          <div className={s.wrapper}>
            <input
              placeholder="0.00"
              onFocus={() => setIsInputFocus(true)}
              onBlur={() => setIsInputFocus(false)}
              value={localValue}
              ref={ref}
              max={max?.toString()}
              min={min?.toString()}
              className={s.input}
              onChange={handleChange}
              {...props}
            />

            <div className={cx(s.exchange, { [s.active]: isInputFocus })}>
              {`$ ${valueInBaseCurrency.toFixed(2)}`}
            </div>
          </div>

          {maxValue && (
            <Button
              theme="clear"
              onClick={handleMax}
              className={s.button}
            >
              max
            </Button>
          )}
        </div>

        <div className={cx(s.errorContainer, { [s.error]: error })}>
          {error && (
            <div className={cx(s.errorText)}>
              {error}
            </div>
          )}
        </div>
      </div>

      {withSlider && maxValue && (
        <Slider
          theme={theme}
          value={localValue}
          maxValue={maxValue}
          onChange={handleSliderChange}
          className={cx(s.slider, themeClasses[theme])}
        />
      )}
    </div>
  );
});

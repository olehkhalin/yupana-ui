import React, { useCallback, useRef, useState } from 'react';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { Button } from 'components/ui/Button';
import { InputInterface } from 'components/modals/CreditProcessModal';

import s from './NumberInput.module.sass';

type NumberInputProps = {
  input: InputInterface
  min?: number | BigNumber;
  max?: number | BigNumber;
  error?: string
  theme?: keyof typeof themeClasses
  onAmountChange?: (newValue?: BigNumber) => void;
  className?: string
} & React.HTMLProps<HTMLInputElement>;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const NumberInput: React.FC<NumberInputProps> = ({
  input,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  error,
  theme = 'primary',
  onAmountChange,
  className,
  ...props
}) => {
  const { metadata } = input;
  const [inputValue, setInputValue] = useState<string>('');
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const decimals = metadata?.decimals ?? 6;
      let val = e.target.value.replace(/ /g, '').replace(/,/g, '.');
      let numVal = new BigNumber(val || 0);
      const indexOfDot = val.indexOf('.');
      if (indexOfDot !== -1 && val.length - indexOfDot > decimals + 1) {
        val = val.substring(0, indexOfDot + decimals + 1);
        numVal = new BigNumber(val);
      }

      if (numVal.isNaN()) {
        return;
      }

      if ((numVal.lt(min) || numVal.gt(max))) {
        console.log(numVal);
      } else {
        setInputValue(val);
        onAmountChange?.(val !== '' ? numVal : undefined);
      }
    },
    [max, metadata?.decimals, min, onAmountChange],
  );

  const handleContainer = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div
        onClick={handleContainer}
        className={cx(s.root, themeClasses[theme], className)}
      >
        <div className={s.wrapper}>
          <input
            placeholder="0.00"
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => setIsInputFocus(false)}
            value={inputValue}
            ref={inputRef}
            max={30}
            min={min?.toString()}
            className={s.input}
            onChange={handleInputChange}
            {...props}
          />

          <div className={cx(s.exchange, { [s.active]: isInputFocus })}>
            {getPrettyAmount({ value: 700, currency: '$' })}
          </div>
        </div>

        <Button
          theme="clear"
          className={s.button}
        >
          max
        </Button>
      </div>

      <div className={cx(s.errorContainer, { [s.error]: error })}>
        {error && (
        <div className={cx(s.errorText)}>
          {error}
        </div>
        )}
      </div>
    </>
  );
};

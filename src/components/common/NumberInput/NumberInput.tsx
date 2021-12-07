import React, {
  useCallback, useRef, useState, useMemo, useEffect,
} from 'react';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { TokenMetadataWithBalanceInterface } from 'types/token';
import { validateInput } from 'utils/validateInput';
import { Button } from 'components/ui/Button';
import { DECIMALS_VALUE } from 'constants/default';

import s from './NumberInput.module.sass';

type NumberInputProps = {
  input: {
    amount: string
    metadata: TokenMetadataWithBalanceInterface
  }
  min?: number | BigNumber
  max?: number | BigNumber
  error?: string
  setError?: (arg: string) => void
  theme?: keyof typeof themeClasses
  priceInUsd: number
  handleInputChange?: (newValue: BigNumber) => void
  balance: number
  isShowMaxButton?: boolean
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
  setError,
  theme = 'primary',
  priceInUsd,
  handleInputChange,
  balance,
  isShowMaxButton = true,
  className,
  ...props
}) => {
  const { amount, metadata } = useMemo(() => input, [input]);

  const [inputValue, setInputValue] = useState<string>('');
  const [currencyInUsd, setCurrencyInUsd] = useState<BigNumber>(new BigNumber(0));
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (amount) {
      setInputValue(amount);
    }
  }, [amount, metadata?.decimals]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const decimals = metadata?.decimals ?? DECIMALS_VALUE;
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

      const inputError = validateInput({
        amount: new BigNumber(e.target.value),
        metadata,
      });

      handleInputChange?.(val !== '' ? numVal : new BigNumber(0));
      setInputValue(val);
      setError?.(inputError);
    },
    [max, metadata, min, handleInputChange, setError],
  );

  // Get user balance by token
  const handleMax = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();

    if (balance === 0) {
      return;
    }

    handleInputChange?.(new BigNumber(balance));
    setInputValue(balance.toString());
    setError?.('');
  }, [balance, handleInputChange, setError]);

  // Counting price in usd
  useEffect(() => {
    const countPriceInUsd = new BigNumber(+inputValue * priceInUsd);
    setCurrencyInUsd(countPriceInUsd);
  }, [inputValue, priceInUsd]);

  // Add click to all container area
  const handleContainer = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={cx(s.root, className)}>
      <div
        onClick={handleContainer}
        className={cx(s.container, themeClasses[theme], { [s.error]: error })}
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
            onChange={onChange}
            {...props}
          />

          <div className={cx(s.exchange, { [s.active]: isInputFocus })}>
            $
            {' '}
            {currencyInUsd.toFixed(2)}
          </div>
        </div>

        {isShowMaxButton && (
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
  );
};

import React, { useRef, useState } from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { Button } from 'components/ui/Button';
import { InputInterface } from 'components/modals/CreditProcessModal';

import s from './CreditInput.module.sass';

type CreditInputProps = {
  theme?: keyof typeof themeClasses
  error?: string
  input: InputInterface
  className?: string
} & React.HTMLProps<HTMLInputElement>;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const CreditInput: React.FC<CreditInputProps> = ({
  theme = 'primary',
  error,
  input,
  className,
  ...props
}) => {
  const { amount } = input;

  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
            value={amount}
            ref={inputRef}
            className={s.input}
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

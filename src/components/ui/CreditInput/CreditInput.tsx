import React, { useRef, useState } from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { Button } from 'components/ui/Button';

import s from './CreditInput.module.sass';

type CreditInputProps = {
  theme?: keyof typeof themeClasses
  error?: string
  className?: string
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const CreditInput: React.FC<CreditInputProps> = ({
  theme = 'primary',
  error,
  className,
}) => {
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0.00);
  const [changeableElement, setChangeableElement] = useState<number>(0.00);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^\d+$/;

    if (regex.test(e.target.value)) {
      setValue(+e.target.value);
      setChangeableElement(+e.target.value);
    }
  };

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
            value={value}
            onChange={handleChange}
            ref={inputRef}
            className={s.input}
          />

          <div className={cx(s.exchange, { [s.active]: isInputFocus })}>
            {getPrettyAmount({ value: changeableElement, currency: '$' })}
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

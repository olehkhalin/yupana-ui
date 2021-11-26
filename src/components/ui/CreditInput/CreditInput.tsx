/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import cx from 'classnames';

import s from './CreditInput.module.sass';

type CreditInputProps = {
  error?: string
  inputClassName?: string
  className?: string
} & React.HTMLProps<HTMLInputElement>;

export const CreditInput = React.forwardRef<HTMLInputElement, CreditInputProps>(({
  error,
  disabled,
  inputClassName,
  className,
  ...props
}, ref) => {
  const [active, setActive] = useState(false);

  return (
    <div className={cx(
      s.root,
      { [s.error]: !!error },
      { [s.active]: active },
      { [s.disabled]: disabled },
      className,
    )}
    >
      <label
        htmlFor="#input"
        className={s.label}
      >
        $ 0.00
      </label>
      <input
        id="input"
        className={cx(s.input, inputClassName)}
        ref={ref}
        onFocus={() => !disabled && setActive(true)}
        onBlur={() => !disabled && setActive(false)}
        disabled={disabled}
        {...props}
      />
      <div className={s.errorContainer}>
        {error && (
          <div className={cx(s.errorText)}>{error}</div>
        )}
      </div>
    </div>
  );
});

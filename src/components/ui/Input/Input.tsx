import React, { forwardRef, HTMLProps, useState } from "react";
import cx from "classnames";

import s from "./Input.module.sass";

type InputProps = {
  error?: string;
  inputClassName?: string;
  className?: string;
} & HTMLProps<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, disabled, inputClassName, className, ...props }, ref) => {
    const [active, setActive] = useState(false);

    return (
      <div
        className={cx(
          s.root,
          { [s.error]: !!error },
          { [s.active]: active },
          { [s.disabled]: disabled },
          className
        )}
      >
        <input
          className={cx(s.input, inputClassName)}
          ref={ref}
          onFocus={() => !disabled && setActive(true)}
          onBlur={() => !disabled && setActive(false)}
          disabled={disabled}
          {...props}
        />
        <div className={s.errorContainer}>
          {error && <div className={cx(s.errorText)}>{error}</div>}
        </div>
      </div>
    );
  }
);

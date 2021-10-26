import React, { useState } from 'react';
import cx from 'classnames';

import s from './Input.module.sass';

type InputProps = {
  error?: string
  className?: string
} & React.HTMLProps<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  error,
  disabled,
  className,
  ...props
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <div className={cx(
      s.root,
      { [s.error]: !!error },
      { [s.hovered]: hovered },
      { [s.active]: active },
      { [s.disabled]: disabled },
      className,
    )}
    >
      <input
        className={s.input}
        ref={ref}
        onMouseOver={() => !disabled && setHovered(true)}
        onMouseLeave={() => !disabled && setHovered(false)}
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

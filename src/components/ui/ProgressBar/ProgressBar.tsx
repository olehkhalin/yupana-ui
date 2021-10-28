import React from 'react';
import cx from 'classnames';

import s from './ProgressBar.module.sass';

type ProgressBarProps = {
  amount: number
  timing: number
  theme?: keyof typeof themeClass
  className?: string
};

export const themeClass = {
  primary: s.primary,
  secondary: s.secondary,
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  amount,
  timing,
  theme = 'primary',
  className,
}) => {
  const compoundClassNames = cx(
    s.root,
    themeClass[theme],
    className,
  );

  return (
    <div className={compoundClassNames}>
      <div
        style={{ width: `calc(${amount}% - 2px)`, transition: `width ${timing}s` }}
        className={s.layout}
      />
    </div>
  );
};

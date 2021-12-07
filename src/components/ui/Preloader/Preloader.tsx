import React from 'react';
import cx from 'classnames';

import s from './Preloader.module.sass';

type PreloaderProps = {
  size?: keyof typeof sizeClass
  theme?: keyof typeof themeClass
  className?: string
};

const sizeClass = {
  small: s.small,
  medium: s.medium,
  large: s.large,
};

const themeClass = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
  quaternary: s.quaternary,
};

export const Preloader: React.FC<PreloaderProps> = ({
  size = 'small',
  theme = 'tertiary',
  className,
}) => {
  const compoundClassName = cx(
    s.root,
    sizeClass[size],
    className,
  );

  return (
    <div className={compoundClassName}>
      <div className={cx(s.internalBorder, themeClass[theme])}>
        <div className={cx(s.light)} />
      </div>
    </div>
  );
};

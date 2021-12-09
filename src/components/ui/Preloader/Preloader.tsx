import React from 'react';
import cx from 'classnames';

import s from './Preloader.module.sass';

type PreloaderProps = {
  theme?: keyof typeof themeClass
  sizeT?: keyof typeof sizeClass
  className?: string
};

const themeClass = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
  quaternary: s.quaternary,
};

const sizeClass = {
  small: s.small,
};

export const Preloader: React.FC<PreloaderProps> = ({
  theme = 'tertiary',
  sizeT = 'small',
  className,
}) => {
  const compoundClassName = cx(
    s.root,
    className,
  );

  return (
    <div className={cx(compoundClassName, sizeClass[sizeT])}>
      <div className={cx(s.internalBorder, themeClass[theme])}>
        <div className={cx(s.light)} />
      </div>
    </div>
  );
};

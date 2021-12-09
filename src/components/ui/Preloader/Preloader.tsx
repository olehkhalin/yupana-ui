import React from 'react';
import cx from 'classnames';

import s from './Preloader.module.sass';

type PreloaderProps = {
  theme?: keyof typeof themeClass
  className?: string
};

const themeClass = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
  quaternary: s.quaternary,
};

export const Preloader: React.FC<PreloaderProps> = ({
  theme = 'tertiary',
  className,
}) => {
  const compoundClassName = cx(
    s.root,
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

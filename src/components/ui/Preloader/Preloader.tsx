import React from 'react';
import cx from 'classnames';

import s from './Preloader.module.sass';

export type PreloaderThemes = keyof typeof themeClassPreloader;

type PreloaderProps = {
  theme?: PreloaderThemes
  sizeT?: keyof typeof sizeClass
  className?: string
};

const themeClassPreloader = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
  quaternary: s.quaternary,
};

const sizeClass = {
  small: s.small,
  medium: s.medium,
  large: s.large,
  fluent: s.fluent,
};

export const Preloader: React.FC<PreloaderProps> = ({
  theme = 'tertiary',
  sizeT = 'fluent',
  className,
}) => {
  const compoundClassName = cx(
    s.preloader,
    className,
  );

  return (
    <div className={cx(compoundClassName)}>
      <div className={cx(s.internalBorder, themeClassPreloader[theme], sizeClass[sizeT])}>
        <div className={cx(s.light)} />
      </div>
    </div>
  );
};

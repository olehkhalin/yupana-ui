import React from 'react';
import cx from 'classnames';

import s from './Preloader.module.sass';

type PreloaderProps = {
  theme?: keyof typeof themeClassPreloader
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

type PreloaderLogoProps = {
  theme?: 'primary' | 'secondary'
  className?: string
};

const themeClassesPreloaderLogo = {
  primary: s.primaryPL,
  secondary: s.secondaryPL,
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

export const PreloaderLogo: React.FC<PreloaderLogoProps> = ({
  theme = 'primary',
  className,
}) => (
  <div className={cx(s.preloaderLogo, themeClassesPreloaderLogo[theme], className)} />
);

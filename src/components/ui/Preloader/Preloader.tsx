import React, { FC } from "react";
import cx from "classnames";

import s from "./Preloader.module.sass";

export type PreloaderThemes = keyof typeof themeClassPreloader;

export type PreloaderProps = {
  theme?: PreloaderThemes;
  sizeT?: keyof typeof sizeClass;
  className?: string;
};

const themeClassPreloader = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
  quaternary: s.quaternary,
  octonary: s.octonary,
  quinary: s.quinary,
};

const sizeClass = {
  xsmall: s.xsmall,
  small: s.small,
  medium: s.medium,
  large: s.large,
  fluent: s.fluent,
};

export const Preloader: FC<PreloaderProps> = ({
  theme = "tertiary",
  sizeT = "fluent",
  className,
}) => {
  const compoundClassName = cx(s.preloader, sizeClass[sizeT], className);

  return (
    <div className={cx(compoundClassName)}>
      <div className={cx(s.layout, themeClassPreloader[theme])}>
        <div className={cx(s.light)} />
      </div>
    </div>
  );
};

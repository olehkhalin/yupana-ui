import React from "react";
import cx from "classnames";

import { AssetType } from "types/asset";
import FallbackLogo from "svg/FallbackLogo.svg";

import s from "./AssetLogo.module.sass";

export type AssetLogoThemes = keyof typeof themeClasses;

type AssetLogoProps = {
  theme?: AssetLogoThemes;
  logo?: Pick<AssetType, "thumbnail" | "name">;
  sizeT?: keyof typeof sizeClass;
  className?: string;
};

const sizeClass = {
  small: s.small,
  medium: s.medium,
  large: s.large,
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
  tertiary: s.tertiary,
};

export const AssetLogo: React.FC<AssetLogoProps> = ({
  theme = "primary",
  logo,
  sizeT = "small",
  className,
}) => {
  const compoundClassName = cx(s.root, sizeClass[sizeT], className);

  if (logo) {
    return (
      <img
        src={logo.thumbnail ? logo.thumbnail : FallbackLogo}
        alt={logo.name ?? "Symbol"}
        className={compoundClassName}
      />
    );
  }

  return <div className={cx(compoundClassName, themeClasses[theme])} />;
};

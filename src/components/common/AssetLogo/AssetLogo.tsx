import React, { FC, useMemo, useState } from "react";
import cx from "classnames";

import { AssetType } from "types/asset";
import { getPrepareAssetLogoUrl } from "utils/helpers/asset";
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

export const AssetLogo: FC<AssetLogoProps> = ({
  theme = "primary",
  logo,
  sizeT = "small",
  className,
}) => {
  const compoundClassName = cx(s.root, sizeClass[sizeT], className);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const image = useMemo(() => {
    if (!isLoaded) {
      return FallbackLogo;
    }

    if (logo) {
      const image =
        getPrepareAssetLogoUrl(logo.thumbnail) && !isLoadingFailed
          ? getPrepareAssetLogoUrl(logo.thumbnail)
          : FallbackLogo;
      return image;
    }

    return FallbackLogo;
  }, [isLoaded, isLoadingFailed, logo]);

  if (logo) {
    return (
      <img
        src={image ?? FallbackLogo}
        alt={logo.name ?? "Symbol"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoadingFailed(true)}
        className={compoundClassName}
      />
    );
  }

  return <div className={cx(compoundClassName, themeClasses[theme])} />;
};

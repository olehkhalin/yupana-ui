import React, { FC } from "react";
import cx from "classnames";

import { AssetType } from "types/asset";
import { getAssetName, getSlice } from "utils/helpers/asset";
import { Button, HTMLButtonType } from "components/ui/Button";
import { Tooltip } from "components/ui/Tooltip";
import { AssetLogo, AssetLogoThemes } from "components/common/AssetLogo";

import s from "./AssetName.module.sass";

type AssetNameProps = {
  theme?: AssetLogoThemes;
  asset?: AssetType;
  href?: string;
  external?: boolean;
  logoClassName?: string;
  active?: boolean;
  loading?: boolean;
  className?: string;
} & HTMLButtonType;

export const AssetName: FC<AssetNameProps> = ({
  theme,
  asset,
  active = false,
  logoClassName,
  loading,
  className,
  ...props
}) => {
  const compoundClassNames = cx(
    s.root,
    { [s.active]: active },
    { [s.loading]: loading },
    className
  );

  if (asset && !loading) {
    const assetName = getAssetName(asset);
    const metadata = {
      name: getSlice(assetName, 5),
      isSlice: assetName
        ? assetName.length > 8
        : asset.symbol
        ? asset.symbol.length > 8
        : false,
    };

    const content = (
      <>
        <AssetLogo
          theme={theme}
          logo={{ name: assetName, thumbnail: asset.thumbnail }}
          className={cx(s.logo, logoClassName)}
        />
        {metadata.name}
      </>
    );

    return (
      <Button
        theme="clear"
        sizeT="small"
        className={compoundClassNames}
        disabled={loading}
        {...props}
      >
        {metadata.isSlice ? (
          <Tooltip content={assetName}>{content}</Tooltip>
        ) : (
          content
        )}
      </Button>
    );
  }

  return (
    <Button
      theme="clear"
      sizeT="small"
      className={compoundClassNames}
      disabled={loading}
      {...props}
    >
      <AssetLogo theme={theme} className={cx(s.logo, logoClassName)} />—
    </Button>
  );
};

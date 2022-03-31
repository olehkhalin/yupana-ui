import React, { FC, useCallback } from "react";
import cx from "classnames";

import { AssetType } from "types/asset";
import { getAssetName } from "utils/helpers/asset";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { useAnalytics } from "hooks/useAnalytics";
import { Button, HTMLButtonType } from "components/ui/Button";
import { ReactComponent as Arrow } from "svg/DropdownArrow.svg";

import s from "./DropdownArrow.module.sass";

type DropdownArrowProps = {
  active?: boolean;
  theme?: keyof typeof themeClasses;
  tableName?: string;
  asset?: AssetType;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
} & HTMLButtonType;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const DropdownArrow: FC<DropdownArrowProps> = ({
  active,
  theme = "primary",
  tableName,
  asset,
  loading,
  onClick,
  className,
  ...props
}) => {
  const { trackEvent } = useAnalytics();

  const handleClick = useCallback(() => {
    onClick && onClick();

    if (asset && tableName && !active) {
      trackEvent(`Arrow click`, AnalyticsEventCategory.LENDING, {
        table_name: tableName,
        asset: getAssetName(asset),
      });
    }
  }, [active, asset, tableName, onClick, trackEvent]);

  const compoundClassNames = cx(
    s.root,
    themeClasses[theme],
    { [s.active]: active },
    { [s.loading]: loading },
    className
  );

  return (
    <Button
      theme="clear"
      sizeT="small"
      onClick={handleClick}
      className={compoundClassNames}
      disabled={loading}
      {...props}
    >
      <Arrow className={s.arrow} />
    </Button>
  );
};

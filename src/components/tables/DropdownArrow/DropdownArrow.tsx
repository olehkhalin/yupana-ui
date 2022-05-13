import React, { FC, useCallback } from "react";
import cx from "classnames";

import { events } from "constants/analytics";
import { AssetType } from "types/asset";
import { TableNameType } from "types/analytics";
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
  tableKey?: string;
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
  tableKey,
  asset,
  loading,
  onClick,
  className,
  ...props
}) => {
  const { trackEvent } = useAnalytics();

  const handleClick = useCallback(() => {
    onClick && onClick();

    // Analytics track
    if (asset && tableName && tableKey && !active) {
      trackEvent(
        events.lending.click_arrow[tableKey as TableNameType],
        AnalyticsEventCategory.LENDING,
        {
          table_name: tableName,
          asset: getAssetName(asset),
        }
      );
    }
  }, [onClick, asset, tableName, active, trackEvent, tableKey]);

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

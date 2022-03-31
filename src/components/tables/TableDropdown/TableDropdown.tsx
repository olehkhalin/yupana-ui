import React, { FC, useCallback } from "react";
import cx from "classnames";
import BigNumber from "bignumber.js";

import { AssetType } from "types/asset";
import { convertUnits } from "utils/helpers/amount";
import { getAssetName } from "utils/helpers/asset";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { useAnalytics } from "hooks/useAnalytics";
import { Button } from "components/ui/Button";
import { Preloader } from "components/ui/Preloader";
import { PrettyAmount } from "components/common/PrettyAmount";

import s from "./TableDropdown.module.sass";

type EventType = React.MouseEvent<HTMLButtonElement>;

export type TableDropdownProps = {
  theme?: keyof typeof themeClasses;
  className?: string;
};

type TableDropdownInnerProps = {
  yToken: number;
  asset: AssetType;
  balanceAmount: BigNumber;
  balanceLoading: boolean;
  balanceLabel: string;
  firstButtonLabel: string;
  handleFirstButtonClick?: () => void;
  secondButtonLabel: string;
  handleSecondButtonClick?: () => void;
  tableName: string;
} & TableDropdownProps;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TableDropdown: FC<TableDropdownInnerProps> = ({
  yToken,
  theme = "primary",
  balanceLabel,
  firstButtonLabel,
  handleFirstButtonClick,
  secondButtonLabel,
  handleSecondButtonClick,
  asset,
  balanceAmount,
  balanceLoading,
  tableName,
  className,
}) => {
  const { trackEvent } = useAnalytics();

  const isSecondaryTheme = theme === "secondary";

  const handleClick = (
    event: EventType,
    label: string,
    callback?: () => void
  ) => {
    event.stopPropagation();
    callback && callback();

    if (label === "Supply") {
      trackEvent(`Open Supply modal`, AnalyticsEventCategory.LENDING, {
        asset: getAssetName(asset),
        table_name: tableName,
      });
    } else if (label === "Withdraw") {
      trackEvent(`Open Withdraw modal`, AnalyticsEventCategory.LENDING, {
        asset: getAssetName(asset),
        table_name: tableName,
      });
    } else if (label === "Borrow") {
      trackEvent(`Open Borrow modal`, AnalyticsEventCategory.LENDING, {
        asset: getAssetName(asset),
        table_name: tableName,
      });
    } else if (label === "Repay") {
      trackEvent(`Open Repay modal`, AnalyticsEventCategory.LENDING, {
        asset: getAssetName(asset),
        table_name: tableName,
      });
    }
  };

  const handleMarketDetails = useCallback(() => {
    if (tableName) {
      trackEvent("Market details click", AnalyticsEventCategory.LENDING, {
        asset: getAssetName(asset),
        table_name: tableName,
      });
    }
  }, [asset, tableName, trackEvent]);

  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.content}>
        <div className={s.title}>
          {`${balanceLabel}:`}
          {balanceLoading ? (
            <Preloader
              sizeT="xsmall"
              theme={theme}
              className={s.balancePreloader}
            />
          ) : (
            <PrettyAmount
              amount={convertUnits(balanceAmount, asset.decimals, true)}
              theme={theme}
              tooltipTheme={theme}
              currency={asset.symbol}
              isMinified
              className={s.amount}
            />
          )}
        </div>
        <Button
          theme="clear"
          href={`/markets/${yToken}`}
          onClick={() => handleMarketDetails()}
          className={s.details}
        >
          Market details...
        </Button>
      </div>

      <div className={s.buttons}>
        <Button
          sizeT="small"
          actionT={isSecondaryTheme ? "borrow" : "supply"}
          onClick={(e: EventType) =>
            handleClick(e, firstButtonLabel, handleFirstButtonClick)
          }
          className={s.button}
        >
          {firstButtonLabel}
        </Button>
        <Button
          sizeT="small"
          actionT={isSecondaryTheme ? "borrow" : "supply"}
          onClick={(e: EventType) =>
            handleClick(e, secondButtonLabel, handleSecondButtonClick)
          }
          className={s.button}
        >
          {secondButtonLabel}
        </Button>
      </div>
    </div>
  );
};

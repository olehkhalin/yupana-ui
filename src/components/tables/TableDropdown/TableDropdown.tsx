import React, { FC, useCallback } from "react";
import cx from "classnames";
import BigNumber from "bignumber.js";

import { WTEZ_CONTRACT } from "constants/defaults";
import { events } from "constants/analytics";
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

export enum TableNameEnum {
  SUPPLY = "supply",
  BORROW = "borrow",
  YOUR_SUPPLY = "your_supply",
  YOUR_BORROW = "your_borrow",
}
enum ActionButton {
  SUPPLY_BUTTON = "supply_button",
  BORROW_BUTTON = "borrow_button",
  WITHDRAW_BUTTON = "withdraw_button",
  REPAY_BUTTON = "repay_button",
}

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

    // Analytics track
    const sendEvent = (table: TableNameEnum, button: ActionButton) => {
      const open_modal = events.lending.open_modal as any;
      trackEvent(open_modal[table][button], AnalyticsEventCategory.LENDING, {
        asset: getAssetName(asset),
        table_name: tableName,
      });
    };
    if (label === "Supply") {
      sendEvent(tableName as TableNameEnum, ActionButton.SUPPLY_BUTTON);
    } else if (label === "Withdraw") {
      sendEvent(tableName as TableNameEnum, ActionButton.WITHDRAW_BUTTON);
    } else if (label === "Borrow") {
      sendEvent(tableName as TableNameEnum, ActionButton.BORROW_BUTTON);
    } else if (label === "Repay") {
      sendEvent(tableName as TableNameEnum, ActionButton.REPAY_BUTTON);
    }
  };

  // Analytics track
  const handleMarketDetails = useCallback(() => {
    if (tableName) {
      trackEvent(
        events.lending.market_details,
        AnalyticsEventCategory.LENDING,
        {
          asset: getAssetName(asset),
          table_name: tableName,
        }
      );
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
              currency={
                asset.contractAddress === WTEZ_CONTRACT ? "TEZ" : asset.symbol
              }
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

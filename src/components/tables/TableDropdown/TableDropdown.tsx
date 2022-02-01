import React from "react";
import cx from "classnames";
import BigNumber from "bignumber.js";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetType } from "types/asset";
import { convertUnits } from "utils/helpers/amount";
import { Button } from "components/ui/Button";
import { PrettyAmount } from "components/common/PrettyAmount";

import s from "./TableDropdown.module.sass";

type TableDropdownProps = {
  yToken: number;
  asset: AssetType;
  balanceAmount: BigNumber;
  balanceLabel: string;
  firstButtonLabel: string;
  secondButtonLabel: string;
  theme?: keyof typeof themeClasses;
  className?: string;
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TableDropdown: React.FC<TableDropdownProps> = ({
  yToken,
  theme = "primary",
  balanceLabel,
  firstButtonLabel,
  secondButtonLabel,
  asset,
  balanceAmount,
  className,
}) => {
  const isSecondaryTheme = theme === "secondary";

  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.content}>
        <div className={s.title}>
          {`${balanceLabel}:`}
          <PrettyAmount
            amount={convertUnits(
              convertUnits(balanceAmount, STANDARD_PRECISION),
              asset.decimals
            )}
            currency={asset.symbol}
            isMinified
            className={s.amount}
          />
        </div>
        <Button theme="clear" href={`/markets/${yToken}`} className={s.details}>
          Markets details...
        </Button>
      </div>

      <div className={s.buttons}>
        <Button
          sizeT="small"
          actionT={isSecondaryTheme ? "borrow" : "supply"}
          onClick={() => console.log("firstButton")}
          className={s.button}
        >
          {firstButtonLabel}
        </Button>
        <Button
          sizeT="small"
          actionT={isSecondaryTheme ? "borrow" : "supply"}
          onClick={() => console.log("secondButton")}
          className={s.button}
        >
          {secondButtonLabel}
        </Button>
      </div>
    </div>
  );
};

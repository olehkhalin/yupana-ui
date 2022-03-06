import React, { FC } from "react";
import BigNumber from "bignumber.js";
import cx from "classnames";

import { AssetType } from "types/asset";
import { useBalance } from "hooks/useBalance";
import { convertUnits } from "utils/helpers/amount";
import { getSliceAssetName } from "utils/helpers/asset";
import { Preloader, PreloaderThemes } from "components/ui/Preloader";
import {
  PrettyAmount,
  PrettyAmountProps,
} from "components/common/PrettyAmount";

import s from "./BalanceAmount.module.sass";

type BalanceAmountProps = {
  asset: AssetType;
  preloaderTheme?: PreloaderThemes;
  isPadding?: boolean;
  className?: string;
} & Omit<PrettyAmountProps, "amount">;

export const BalanceAmount: FC<BalanceAmountProps> = ({
  asset,
  preloaderTheme = "primary",
  isPadding = false,
  className,
  ...props
}) => {
  const { data, loading } = useBalance(asset);

  if (loading) {
    return (
      <Preloader
        theme={preloaderTheme}
        className={cx({ [s.paddingRight]: loading && isPadding }, className)}
      />
    );
  }

  return (
    <PrettyAmount
      amount={convertUnits(data ?? new BigNumber(0), asset.decimals, true)}
      currency={getSliceAssetName(asset)}
      // className={className}
      {...props}
    />
  );
};

import React, { FC } from "react";
import cx from "classnames";

import { getPrettyAmount } from "utils/helpers/amount";
import { PrettyAmount } from "components/common/PrettyAmount";

import { SupplyLine } from "./SupplyLine";
import { MarketsCardWithDataProps } from "./markets-card";
import s from "./MarketsCard.module.sass";

export const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const MarketsCard: FC<MarketsCardWithDataProps> = ({
  totalAmount,
  volume24h,
  numberOfMembers,
  assets,
  theme = "primary",
  className,
}) => {
  const isPrimaryTheme = theme === "primary";

  return (
    <div className={cx(s.root, themeClasses[theme], className)}>
      <div className={s.title}>
        {isPrimaryTheme ? "Total supply:" : "Total borrow:"}
      </div>
      <div className={s.amount}>
        <PrettyAmount
          amount={totalAmount}
          isConvertable
          className={s.withTezosLarge}
        />
      </div>

      <div className={s.row}>
        <div className={s.text}>
          {isPrimaryTheme ? "24H Supply Volume" : "24H Borrow Volume"}
        </div>
        <div className={s.value}>
          <PrettyAmount
            amount={volume24h}
            isConvertable
            className={s.withTezos}
          />
        </div>
      </div>

      <div className={s.row}>
        <div className={s.text}>
          # of
          {` ${isPrimaryTheme ? "Suppliers" : "Borrowers"}`}
        </div>
        <div className={s.value}>
          {getPrettyAmount({ value: numberOfMembers, dec: 0 })}
        </div>
      </div>

      <div className={s.caption}>Top 3 markets</div>
      <div className={s.wrapper}>
        {assets.map(({ volume24h: assetVolume24h, asset }) => (
          <SupplyLine
            key={asset.contractAddress}
            theme={theme}
            percent={+assetVolume24h}
            asset={asset}
            className={s.progressBar}
          />
        ))}
      </div>
    </div>
  );
};

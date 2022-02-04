import React, { FC } from "react";
import cx from "classnames";

import { Preloader } from "components/ui/Preloader";

import { SupplyLineLoading } from "./SupplyLine";
import { MarketsCardBaseProps } from "./markets-card";
import { themeClasses } from "./MarketsCard";
import s from "./MarketsCard.module.sass";

export const MarketsCardLoading: FC<MarketsCardBaseProps> = ({
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
        <Preloader theme={theme} sizeT="medium" className={s.amountPreloader} />
      </div>

      <div className={s.row}>
        <div className={s.text}>
          {isPrimaryTheme ? "24H Supply Volume" : "24H Borrow Volume"}
        </div>
        <div className={s.value}>
          <Preloader className={s.valuePreloader} />
        </div>
      </div>

      <div className={s.row}>
        <div className={s.text}>
          # of
          {` ${isPrimaryTheme ? "Suppliers" : "Borrowers"}`}
        </div>
        <div className={s.value}>
          <Preloader className={s.valuePreloader} />
        </div>
      </div>

      <div className={s.caption}>Top 3 markets</div>
      <div className={s.wrapper}>
        {[0, 1].map((el) => (
          <SupplyLineLoading key={el} theme={theme} className={s.progressBar} />
        ))}
      </div>
    </div>
  );
};

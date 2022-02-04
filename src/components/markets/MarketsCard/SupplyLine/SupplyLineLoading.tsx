import React, { FC } from "react";
import cx from "classnames";

import { ProgressBar } from "components/ui/ProgressBar";
import { Preloader } from "components/ui/Preloader";

import { SupplyLineBaseProps } from "./supply-line";
import s from "./SupplyLine.module.sass";

export const SupplyLineLoading: FC<SupplyLineBaseProps> = ({
  theme = "primary",
  className,
}) => {
  return (
    <div className={cx(s.root, className)}>
      <div className={s.content}>
        <div className={s.symbol}>
          <Preloader className={s.percentPreloader} />
        </div>

        <div className={s.percent}>
          <Preloader className={s.percentPreloader} />
        </div>
      </div>

      <ProgressBar theme={theme} amount={0} timing={0} />
    </div>
  );
};

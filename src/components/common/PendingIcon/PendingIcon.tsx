import React, { FC } from "react";
import cx from "classnames";

import { TransactionType } from "components/modals/AccountModal/TransactionsHistory/TransactionsHistory";
import s from "./PendingIcon.module.sass";

type PendingIconProps = {
  type?: string;
  isTransparent?: boolean;
  className?: string;
};

export const PendingIcon: FC<PendingIconProps> = ({
  type,
  isTransparent,
  className,
}) => {
  const isBlueTheme =
    type === TransactionType.SUPPLY || type === TransactionType.WITHDRAW;
  const isYellowTheme =
    type === TransactionType.BORROW || type === TransactionType.REPAY;

  return (
    <div className={cx(s.root, { [s.transparent]: isTransparent }, className)}>
      <div
        className={cx(
          s.animation,
          { [s.blue]: isBlueTheme },
          { [s.yellow]: isYellowTheme }
        )}
      />
      <div className={s.dots}>...</div>
    </div>
  );
};

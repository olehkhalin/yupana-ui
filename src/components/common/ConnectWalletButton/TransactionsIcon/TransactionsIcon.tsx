import React, { FC } from "react";
import cx from "classnames";

import { Status, useTransactions } from "hooks/useTransactions";
import { PendingIcon } from "components/common/PendingIcon";
import { ReactComponent as Transactions } from "svg/Transactions.svg";
import { ReactComponent as Applied } from "svg/Applied.svg";
import { ReactComponent as Reject } from "svg/Reject.svg";

import s from "./TransactionsIcon.module.sass";

type TransactionsIconProps = {
  className?: string;
};

export const TransactionsIcon: FC<TransactionsIconProps> = ({ className }) => {
  const { lastTransactionStatus, isTransactionCompleted } = useTransactions();

  const compoundClassName = cx(s.root, className);

  if (lastTransactionStatus === Status.PENDING) {
    return <PendingIcon className={compoundClassName} />;
  }
  if (lastTransactionStatus === Status.APPLIED && isTransactionCompleted) {
    return <Applied className={cx(s.blue, compoundClassName)} />;
  }
  if (lastTransactionStatus === Status.REJECT && isTransactionCompleted) {
    return <Reject className={cx(s.blue, compoundClassName)} />;
  }

  return <Transactions className={compoundClassName} />;
};

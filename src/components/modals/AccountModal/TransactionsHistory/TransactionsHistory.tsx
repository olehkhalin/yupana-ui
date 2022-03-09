import React, { FC } from "react";
import { format } from "timeago.js";
import cx from "classnames";

import { Status, useTransactions } from "hooks/useTransactions";
import { TZKT } from "constants/defaults";
import { Button } from "components/ui/Button";
import { PendingIcon } from "components/common/PendingIcon";
import { ReactComponent as Applied } from "svg/Applied.svg";
import { ReactComponent as TransactionLink } from "svg/TransactionLink.svg";
import { ReactComponent as Reject } from "svg/Reject.svg";

import s from "./TransactionsHistory.module.sass";

const getDynamicColors = (type: string, status?: string): string => {
  const isBlueTheme =
    type === TransactionType.SUPPLY || type === TransactionType.WITHDRAW;
  const isYellowTheme =
    type === TransactionType.BORROW || type === TransactionType.REPAY;
  const isReject = status === Status.REJECT;

  return cx(
    { [s.blue]: isBlueTheme },
    { [s.yellow]: isYellowTheme },
    { [s.red]: isReject }
  );
};

const getStatusIcon = (type: string, status: string) => {
  switch (status) {
    case Status.APPLIED:
      return (
        <Applied className={cx(s.status, getDynamicColors(type, status))} />
      );
    case Status.REJECT:
      return <Reject className={s.status} />;
    case Status.PENDING:
      return (
        <PendingIcon
          type={type}
          className={cx(s.status, getDynamicColors(type, status))}
        />
      );
    default:
      <Applied className={s.status} />;
  }
  return null;
};

type TransactionsHistoryProps = {
  className?: string;
};

export enum TransactionType {
  SUPPLY = "Supply",
  WITHDRAW = "Withdraw",
  BORROW = "Borrow",
  REPAY = "Repay",
}

export const TransactionsHistory: FC<TransactionsHistoryProps> = ({
  className,
}) => {
  const { allTransactions } = useTransactions();

  return (
    <div className={cx(s.root, className)}>
      <div className={s.title}>Recent transactions:</div>

      <div className={s.wrapper}>
        {allTransactions &&
          allTransactions.length > 0 &&
          allTransactions.map(
            ({ type, amount, name, opHash, status, timestamp }) => (
              <div key={opHash} className={s.transaction}>
                {getStatusIcon(type, status)}

                <div className={s.info}>
                  <div className={cx(s.type, getDynamicColors(type, status))}>
                    {`${type} — ${status}`}

                    <Button
                      theme="clear"
                      href={`${TZKT}/${opHash}`}
                      external
                      className={s.linkButton}
                    >
                      <TransactionLink className={s.link} />
                    </Button>
                  </div>

                  {amount && (
                    <div className={s.amount}>{amount.toString()}</div>
                  )}

                  <div className={s.footer}>
                    {name}

                    <div className={s.timestamp}>{format(timestamp)}</div>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

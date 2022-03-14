import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import constate from "constate";
import BigNumber from "bignumber.js";

import {
  TRANSACTION_LIFETIME,
  TRANSACTIONS_LS_KEY,
  TZKT_API,
} from "constants/defaults";
import { useAccountPkh, useOnBlock, useTezos } from "utils/dapp";

export type Transaction = {
  type: string;
  amount?: BigNumber;
  name: string;
  opHash: string;
  status: string;
  timestamp: number;
  expired?: boolean;
};

export type AllTransactions = {
  [key: string]: Transaction[];
};

export enum Status {
  PENDING = "Pending",
  APPLIED = "Applied",
  REJECT = "Reject",
}

export const [TransactionsProvider, useTransactions] = constate(() => {
  const tezos = useTezos();
  const pkh = useAccountPkh();

  const lsKey = useMemo(() => `${TRANSACTIONS_LS_KEY}-${pkh}`, [pkh]);

  const transactionsFromLS = useMemo(
    () => JSON.parse(localStorage.getItem(lsKey) as string),
    [lsKey]
  );

  const [allTransactions, setAllTransactions] = useState<Transaction[] | null>(
    transactionsFromLS ?? []
  );
  const [isTransactionCompleted, setIsTransactionCompleted] =
    useState<boolean>(false);
  const [lastTransactionStatus, setLastTransactionStatus] =
    useState<Status | null>(null);

  const prevPendingState = useRef(lastTransactionStatus === Status.PENDING);

  useEffect(() => {
    setAllTransactions(transactionsFromLS);
  }, [transactionsFromLS]);

  const addTransaction = useCallback(
    (transaction: Transaction) => {
      if (allTransactions && allTransactions && allTransactions.length > 0) {
        const currentTransaction = allTransactions.find(
          (el) => el.opHash === transaction.opHash
        );

        if (currentTransaction) {
          const trsWithoutCurrent = allTransactions.filter(
            (el) => el.opHash !== currentTransaction.opHash
          );

          if (currentTransaction.expired) {
            return setAllTransactions(trsWithoutCurrent);
          }

          return setAllTransactions([...trsWithoutCurrent, transaction]);
        }

        return setAllTransactions([...allTransactions, transaction]);
      }

      return setAllTransactions([transaction]);
    },
    [allTransactions]
  );

  useEffect(() => {
    if (
      JSON.stringify(transactionsFromLS) !== JSON.stringify(allTransactions)
    ) {
      if (allTransactions && allTransactions.length && pkh) {
        localStorage.setItem(lsKey, JSON.stringify(allTransactions));
      }
    }
  }, [allTransactions, lsKey, pkh, transactionsFromLS]);

  const isTransactionsExist = useMemo(
    (): boolean =>
      !!(allTransactions && allTransactions && allTransactions.length > 0),
    [allTransactions]
  );

  const sortedTransactions = useMemo(
    () =>
      allTransactions &&
      allTransactions.length &&
      allTransactions.sort((a, b) => b.timestamp - a.timestamp),
    [allTransactions]
  );

  useEffect(() => {
    if (sortedTransactions && sortedTransactions.length) {
      const { status } = sortedTransactions[0];
      setLastTransactionStatus(status as Status);
    }
  }, [sortedTransactions]);

  // check if transaction was recently completed
  useEffect(() => {
    if (prevPendingState.current) {
      setIsTransactionCompleted(prevPendingState.current);
    }
    prevPendingState.current = lastTransactionStatus === Status.PENDING;
  }, [lastTransactionStatus]);

  // reset the status of completed transaction
  useEffect(() => {
    if (isTransactionCompleted) {
      const resetTransactionCompletedStatus = setTimeout(
        () => setIsTransactionCompleted(false),
        2000
      );
      return () => clearTimeout(resetTransactionCompletedStatus);
    }
    return undefined;
  }, [isTransactionCompleted]);

  const checkTransactions = useCallback(async () => {
    const transactionsFromLS: Transaction[] | null = JSON.parse(
      localStorage.getItem(lsKey) as string
    );

    if (
      transactionsFromLS &&
      transactionsFromLS &&
      transactionsFromLS.length > 0
    ) {
      const transactionsWithPending = transactionsFromLS.filter(
        (transaction) => transaction.status === Status.PENDING
      );

      if (!(transactionsWithPending && transactionsWithPending.length > 0)) {
        return undefined;
      }

      Promise.all(
        transactionsWithPending.map(async (el) => {
          try {
            const response = await fetch(
              `${TZKT_API}/operations/transactions/${el.opHash}`
            );
            const data: any[] = await response.json();

            // if data doesn't exist (transaction 'Pending' on API)
            if (!(data && data.length > 0)) {
              // check if transaction has status 'Pending' more than 4 hours
              // if 'true' then set 'expired' value
              // if 'false' then do nothing
              if (Date.now() - TRANSACTION_LIFETIME > el.timestamp) {
                return addTransaction({
                  ...el,
                  expired: true,
                });
              }
              return undefined;
            }

            // check 'Applied' status for all the contract methods
            // for current transaction
            const transactionIsApplied = data.every(
              (method) => method.status === "applied"
            );

            if (transactionIsApplied) {
              return addTransaction({
                ...el,
                status: Status.APPLIED,
              });
            }

            return addTransaction({
              ...el,
              status: Status.REJECT,
            });
          } catch (e) {
            console.log("Error with transaction:", e);

            return addTransaction({
              ...el,
              status: Status.REJECT,
            });
          }
        })
      );
    }

    return undefined;
  }, [addTransaction, lsKey]);

  useOnBlock(tezos, [checkTransactions]);

  return {
    addTransaction,
    allTransactions: sortedTransactions,
    isTransactionLoading: lastTransactionStatus === Status.PENDING,
    setAllTransactions,
    isTransactionsExist,
    lastTransactionStatus,
    isTransactionCompleted,
  };
});

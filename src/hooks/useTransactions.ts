import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import constate from "constate";
import BigNumber from "bignumber.js";

import {
  TRANSACTION_LIFETIME,
  TRANSACTIONS_LS_KEY,
  TZKT_API,
} from "constants/defaults";
import { useOnBlock, useTezos } from "utils/dapp";

export type Transaction = {
  type: string;
  amount?: BigNumber;
  name: string;
  opHash: string;
  status: string;
  timestamp: number;
  expired?: boolean;
};

export enum Status {
  PENDING = "Pending",
  APPLIED = "Applied",
  REJECT = "Reject",
}

export const [TransactionsProvider, useTransactions] = constate(() => {
  const tezos = useTezos();

  // get transactions from LocalStorage
  const transactionsFromLS: Transaction[] | null = useMemo(
    () => JSON.parse(localStorage.getItem(TRANSACTIONS_LS_KEY) as string),
    []
  );

  const [allTransactions, setAllTransactions] = useState<Transaction[] | null>(
    transactionsFromLS
  );
  const [isTransactionCompleted, setIsTransactionCompleted] =
    useState<boolean>(false);
  const [lastTransactionStatus, setLastTransactionStatus] =
    useState<Status | null>(null);

  // get prev state by 'pending' status
  const prevPendingState = useRef(lastTransactionStatus === Status.PENDING);

  // add new transactions to array
  const addTransaction = useCallback(
    (transaction: Transaction) => {
      if (allTransactions && allTransactions.length > 0) {
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

  // compare arrays and update LocalStorage data
  useEffect(() => {
    if (
      JSON.stringify(transactionsFromLS) !== JSON.stringify(allTransactions)
    ) {
      localStorage.setItem(
        TRANSACTIONS_LS_KEY,
        JSON.stringify(allTransactions)
      );
    }
  }, [allTransactions, transactionsFromLS]);

  // check if transactions exist
  const isTransactionsExist = useMemo(
    (): boolean => !!(allTransactions && allTransactions.length > 0),
    [allTransactions]
  );

  // new transaction on top
  const sortedTransactions = useMemo(
    () =>
      allTransactions &&
      allTransactions.length &&
      allTransactions.sort((a, b) => b.timestamp - a.timestamp),
    [allTransactions]
  );

  // get status of last transaction
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
      localStorage.getItem(TRANSACTIONS_LS_KEY) as string
    );

    if (transactionsFromLS && transactionsFromLS.length > 0) {
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

            // if has 'Applied' status then set status 'Applied'
            if (transactionIsApplied) {
              return addTransaction({
                ...el,
                status: Status.APPLIED,
              });
            }

            // if hasn't 'Applied' status then set status 'Reject'
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
  }, [addTransaction]);

  useOnBlock(tezos, [checkTransactions]);

  return {
    addTransaction,
    allTransactions: sortedTransactions,
    isTransactionLoading: lastTransactionStatus === Status.PENDING,
    setAllTransactions,
    lastTransaction:
      allTransactions && allTransactions.length ? allTransactions[0] : null,
    isTransactionsExist,
    lastTransactionStatus,
    isTransactionCompleted,
  };
});

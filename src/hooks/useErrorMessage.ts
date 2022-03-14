import { useCallback, useMemo } from "react";
import { FieldErrors } from "react-hook-form";
import BigNumber from "bignumber.js";

import { getAdvancedErrorMessage } from "utils/validation";

import { CreditProcessModalEnum } from "./useCreditProcessModal";

export const useErrorMessage = ({
  errors,
  type,
  dynamicBorrowLimitUsed,
  amount,
  walletBalance,
  availableToWithdraw,
  liquidity,
}: {
  errors: FieldErrors;
  type: CreditProcessModalEnum | undefined;
  dynamicBorrowLimitUsed: BigNumber;
  amount: BigNumber;
  walletBalance?: BigNumber;
  availableToWithdraw?: BigNumber;
  liquidity?: BigNumber;
}) => {
  const amountErrorMessage = useMemo(
    () => getAdvancedErrorMessage(errors.amount),
    [errors.amount]
  );

  const amountWarningMessage = useMemo(() => {
    if (
      type === CreditProcessModalEnum.BORROW &&
      dynamicBorrowLimitUsed.gte(100)
    ) {
      return "You are in the Liquidation Risk";
    }
    if (
      type === CreditProcessModalEnum.BORROW &&
      dynamicBorrowLimitUsed.gte(80)
    ) {
      return "Beware of the Liquidation Risk";
    }
    return undefined;
  }, [dynamicBorrowLimitUsed, type]);

  const amountGTBalance = useMemo(
    () =>
      type === CreditProcessModalEnum.REPAY &&
      amount &&
      amount.gt(walletBalance ?? 0)
        ? "Insufficient Wallet Balance"
        : undefined,
    [amount, walletBalance, type]
  );

  const checkValueInContract = useCallback(
    (modalType: CreditProcessModalEnum, value: BigNumber | undefined) => {
      const val = value ?? 0;
      return type === modalType && amount && amount.gt(val)
        ? "Insufficient balance in contract"
        : undefined;
    },
    [amount, type]
  );

  const insufficientContractBalanceError = useMemo(
    () =>
      checkValueInContract(
        CreditProcessModalEnum.WITHDRAW,
        availableToWithdraw
      ) || checkValueInContract(CreditProcessModalEnum.BORROW, liquidity),
    [availableToWithdraw, checkValueInContract, liquidity]
  );

  const errorMessage = useMemo(
    () =>
      amountErrorMessage || amountGTBalance || insufficientContractBalanceError,
    [amountErrorMessage, amountGTBalance, insufficientContractBalanceError]
  );

  return {
    errorMessage: errorMessage || amountWarningMessage,
    disabled: amountWarningMessage && !errorMessage ? false : !!errorMessage,
  };
};

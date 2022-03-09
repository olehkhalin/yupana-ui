import constate from "constate";
import { useState, useCallback } from "react";
import BigNumber from "bignumber.js";

import { AssetType } from "types/asset";
import { ModalActions } from "types/modal";

export enum CreditProcessModalEnum {
  SUPPLY = "supply",
  WITHDRAW = "withdraw",
  BORROW = "borrow",
  REPAY = "repay",
}

type CreditProcessModalProps =
  | ({
      type: CreditProcessModalEnum;
      maxAmount: BigNumber;
      walletBalance?: BigNumber;
      liquidity?: BigNumber;
      availableToWithdraw?: BigNumber;
      asset: AssetType;
      borrowLimit: BigNumber;
      dynamicBorrowLimitFunc?: (input: BigNumber) => BigNumber;
      borrowLimitUsed: BigNumber;
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => BigNumber;
      onSubmit: any;
      oraclePrice: {
        price: BigNumber;
        decimals: number;
      };
    } & Pick<ModalActions, "isOpen">)
  | null;

export const [CreditProcessModalProvider, useCreditProcessModal] = constate(
  () => {
    const [infoState, setInfoState] = useState<CreditProcessModalProps>(null);

    const setCreditProcessModalData = useCallback(
      (info: CreditProcessModalProps) => {
        setInfoState(info);
      },
      []
    );

    return {
      creditProcessModalData: infoState,
      setCreditProcessModalData,
    };
  }
);

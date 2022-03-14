import React, { useEffect, useCallback, useMemo, useState, FC } from "react";
import { Controller, useForm } from "react-hook-form";
import BigNumber from "bignumber.js";
import cx from "classnames";

import { ORACLE_PRICE_PRECISION } from "constants/defaults";
import { ModalActions } from "types/modal";
import { AssetType } from "types/asset";
import { getSliceAssetName, getAssetName } from "utils/helpers/asset";
import { getPrettyPercent, convertUnits } from "utils/helpers/amount";
import { useWiderThanMphone } from "utils/helpers";
import { assetAmountValidationFactory } from "utils/validation";
import { useUpdateToast } from "hooks/useUpdateToast";
import { useBorrowWarningMessage } from "hooks/useBorrowWarningMessage";
import {
  CreditProcessModalEnum,
  useCreditProcessModal,
} from "hooks/useCreditProcessModal";
import { useTransactions } from "hooks/useTransactions";
import { PendingIcon } from "components/common/PendingIcon";
import { Modal } from "components/ui/Modal";
import { NumberInput } from "components/common/NumberInput";
import { Button } from "components/ui/Button";
import { AssetLogo } from "components/common/AssetLogo";
import { PrettyAmount } from "components/common/PrettyAmount";

import s from "./CreditProcessModal.module.sass";
import { useErrorMessage } from "hooks/useErrorMessage";

export type FormTypes = {
  amount: BigNumber;
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

type CreditProcessModalInnerProps = {
  type?: CreditProcessModalEnum;
  theme?: keyof typeof themeClasses;
  asset: AssetType;
  borrowLimit: BigNumber;
  borrowLimitUsed: BigNumber;
  dynamicBorrowLimitFunc?: (input: BigNumber) => BigNumber;
  dynamicBorrowLimitUsedFunc: (input: BigNumber) => BigNumber;
  title: string;
  balanceLabel: string;
  maxAmount: BigNumber;
  walletBalance?: BigNumber;
  liquidity?: BigNumber;
  availableToWithdraw?: BigNumber;
  onSubmit: any;
  oraclePrice: {
    price: BigNumber;
    decimals: number;
  };
} & Pick<ModalActions, "isOpen" | "onRequestClose">;

const CreditProcessModalInner: FC<CreditProcessModalInnerProps> = ({
  type,
  theme = "primary",
  isOpen,
  onRequestClose,
  asset,
  borrowLimit,
  borrowLimitUsed,
  dynamicBorrowLimitFunc,
  dynamicBorrowLimitUsedFunc,
  title,
  balanceLabel,
  maxAmount,
  walletBalance,
  liquidity,
  availableToWithdraw,
  onSubmit,
  oraclePrice,
}) => {
  const { updateToast } = useUpdateToast();
  const isWiderThanMphone = useWiderThanMphone();
  const [dynamicBorrowLimit, setDynamicBorrowLimit] = useState(
    new BigNumber(0)
  );
  const [dynamicBorrowLimitUsed, setDynamicBorrowLimitUsed] = useState(
    new BigNumber(0)
  );
  const [operationLoading, setOperationLoading] = useState(false);
  const { isTransactionLoading } = useTransactions();

  const { handleSubmit, control, formState, watch, setFocus } =
    useForm<FormTypes>({
      defaultValues: {
        amount: new BigNumber(0),
      },
      mode: "onChange",
    });

  const { errors } = formState;

  const amount = watch("amount");

  useEffect(() => {
    if (dynamicBorrowLimitFunc) {
      setDynamicBorrowLimit(dynamicBorrowLimitFunc(amount));
    }
    setDynamicBorrowLimitUsed(dynamicBorrowLimitUsedFunc(amount));
  }, [amount, dynamicBorrowLimitFunc, dynamicBorrowLimitUsedFunc]);

  const validateAmount = useMemo(
    () =>
      assetAmountValidationFactory({
        max: convertUnits(maxAmount, asset.decimals, true),
      }),
    [asset.decimals, maxAmount]
  );

  const borrowWarningMessage = useBorrowWarningMessage(asset, type);
  const { errorMessage, disabled } = useErrorMessage({
    errors,
    type,
    dynamicBorrowLimitUsed,
    amount,
    walletBalance,
    availableToWithdraw,
    liquidity,
  });

  // Form submit
  const onSubmitInner = useCallback(
    async ({ amount: inputData }: FormTypes) => {
      const mutezAmount = new BigNumber(
        convertUnits(inputData, -asset.decimals)
      );

      const isMaxAmount = mutezAmount.eq(
        maxAmount.decimalPlaces(0, BigNumber.ROUND_DOWN)
      );
      try {
        setOperationLoading(true);
        await onSubmit(mutezAmount, isMaxAmount);
        onRequestClose();
      } catch (e) {
        updateToast({
          type: "error",
          // @ts-ignore
          render: e.message,
        });
      } finally {
        setOperationLoading(false);
      }
    },
    [asset.decimals, maxAmount, onRequestClose, onSubmit, updateToast]
  );

  const isBorrowTheme = theme === "secondary";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      innerClassName={s.inner}
      theme={theme}
      className={cx(s.root, { [s.borrow]: isBorrowTheme })}
    >
      <form onSubmit={handleSubmit(onSubmitInner as any)} className={s.form}>
        <h2 className={s.title}>{title}</h2>

        <div className={s.tokenInfo}>
          <AssetLogo
            sizeT={isWiderThanMphone ? "large" : "medium"}
            logo={{
              name: getAssetName(asset),
              thumbnail: asset.thumbnail,
            }}
            className={s.icon}
          />
          {getAssetName(asset, true)}
        </div>

        <div className={s.walletBalance}>
          {balanceLabel}

          <div className={s.balance}>
            <PrettyAmount
              amount={convertUnits(maxAmount, asset.decimals, true)}
              currency={getSliceAssetName(asset)}
              tooltipTheme={theme}
            />
          </div>
        </div>

        <Controller
          name="amount"
          control={control}
          rules={{ validate: validateAmount }}
          render={({ field }) => (
            // @ts-ignore
            <NumberInput
              theme={theme}
              decimals={asset.decimals}
              error={errorMessage || borrowWarningMessage}
              className={s.input}
              maxValue={convertUnits(maxAmount, asset.decimals, true)}
              setFocus={() => setFocus("amount")}
              exchangeRate={convertUnits(
                oraclePrice.price,
                ORACLE_PRICE_PRECISION
              ).multipliedBy(oraclePrice.decimals)}
              disabled={!!borrowWarningMessage}
              {...field}
            />
          )}
        />

        <h2 className={s.borrowTitle}>Borrow limit</h2>

        <div className={s.borrowLimit}>
          <div className={s.borrowDescription}>
            {dynamicBorrowLimitFunc
              ? "Available to borrow:"
              : "Your Borrow Limit:"}
          </div>
          <div className={s.borrowResult}>
            <PrettyAmount
              amount={borrowLimit}
              isConvertable
              isMinified
              className={s.prettyTez}
              tooltipTheme={theme}
            />
            {dynamicBorrowLimitFunc && (
              <>
                {" -> "}
                <PrettyAmount
                  amount={dynamicBorrowLimit}
                  isConvertable
                  isMinified
                  className={s.prettyTez}
                  tooltipTheme={theme}
                />
              </>
            )}
          </div>
        </div>

        <div className={s.borrowLimitUsed}>
          <div className={s.borrowDescription}>Borrow Limit Used:</div>
          <div className={s.borrowResult}>
            {getPrettyPercent(borrowLimitUsed)}
            {" -> "}
            {getPrettyPercent(dynamicBorrowLimitUsed)}
          </div>
        </div>

        <Button
          sizeT={isWiderThanMphone ? "large" : "medium"}
          actionT={isBorrowTheme ? "borrow" : "supply"}
          type="submit"
          disabled={
            disabled ||
            !!borrowWarningMessage ||
            operationLoading ||
            maxAmount.eq(0) ||
            isTransactionLoading
          }
          className={s.button}
        >
          {operationLoading || isTransactionLoading ? (
            <PendingIcon isTransparent />
          ) : (
            title
          )}
        </Button>
      </form>
    </Modal>
  );
};

const getModalLabels = (type: CreditProcessModalEnum) => {
  switch (type) {
    case CreditProcessModalEnum.SUPPLY:
      return {
        title: "Supply",
        balanceLabel: "Wallet balance:",
      };
    case CreditProcessModalEnum.WITHDRAW:
      return {
        title: "Withdraw",
        balanceLabel: "Available to withdraw:",
      };
    case CreditProcessModalEnum.BORROW:
      return {
        title: "Borrow",
        balanceLabel: "Borrow balance:",
      };
    default:
      return {
        title: "Repay",
        balanceLabel: "Borrow balance:",
      };
  }
};

export const CreditProcessModal = () => {
  const { creditProcessModalData, setCreditProcessModalData } =
    useCreditProcessModal();

  const handleModalClose = () => setCreditProcessModalData(null);

  if (creditProcessModalData === null) {
    return <></>;
  }

  const {
    type,
    asset,
    maxAmount,
    borrowLimit,
    dynamicBorrowLimitFunc,
    borrowLimitUsed,
    dynamicBorrowLimitUsedFunc,
    onSubmit,
    oraclePrice,
    walletBalance,
    liquidity,
    availableToWithdraw,
  } = creditProcessModalData;

  return (
    <CreditProcessModalInner
      maxAmount={maxAmount}
      asset={asset}
      borrowLimit={borrowLimit}
      dynamicBorrowLimitFunc={dynamicBorrowLimitFunc}
      borrowLimitUsed={borrowLimitUsed}
      dynamicBorrowLimitUsedFunc={dynamicBorrowLimitUsedFunc}
      theme={
        type === CreditProcessModalEnum.SUPPLY ||
        type === CreditProcessModalEnum.WITHDRAW
          ? "primary"
          : "secondary"
      }
      type={type}
      isOpen
      onRequestClose={handleModalClose}
      onSubmit={onSubmit}
      oraclePrice={oraclePrice}
      walletBalance={walletBalance}
      liquidity={liquidity}
      availableToWithdraw={availableToWithdraw}
      {...getModalLabels(type)}
    />
  );
};

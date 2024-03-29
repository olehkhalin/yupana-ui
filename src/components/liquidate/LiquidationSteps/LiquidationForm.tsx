import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useReactiveVar } from "@apollo/client";
import { useParams } from "react-router-dom";
import BigNumber from "bignumber.js";
import cx from "classnames";

import { WTEZ_CONTRACT } from "constants/defaults";
import { AssetType } from "types/asset";
import { liquidate } from "utils/dapp/methods/liquidate";
import { useAccountPkh, useTezos } from "utils/dapp";
import { getAssetName } from "utils/helpers/asset";
import { convertUnits } from "utils/helpers/amount";
import {
  assetAmountValidationFactory,
  getAdvancedErrorMessage,
} from "utils/validation";
import { useWiderThanMphone } from "utils/helpers";
import { contractAddressesVar } from "utils/cache";
import { useLiquidateDetails } from "hooks/useLiquidateDetails";
import { useLiquidateData } from "hooks/useLiquidateData";
import { useUpdateToast } from "hooks/useUpdateToast";
import { Status, useTransactions } from "hooks/useTransactions";
import { useBalance } from "hooks/useBalance";
import { Button } from "components/ui/Button";
import { Heading } from "components/common/Heading";
import { NumberInput } from "components/common/NumberInput";
import { PrettyAmount } from "components/common/PrettyAmount";
import { FormTypes } from "components/modals/CreditProcessModal";
import { PendingIcon } from "components/common/PendingIcon";
import { ConnectWalletButton } from "components/common/ConnectWalletButton";

import s from "./LiquidationSteps.module.sass";

export const LiquidationForm: FC = () => {
  // @ts-ignore
  const { borrowerAddress }: { borrowerAddress: string } = useParams();
  const isWiderThanMphone = useWiderThanMphone();
  const { updateToast } = useUpdateToast();
  const { fabrica, priceFeedProxy } = useReactiveVar(contractAddressesVar);
  const { addTransaction, isTransactionLoading } = useTransactions();

  const tezos = useTezos()!;
  const accountPkh = useAccountPkh();

  const [operationLoading, setOperationLoading] = useState(false);

  const { data: liquidateAllData } = useLiquidateDetails(borrowerAddress);
  const { liquidateData } = useLiquidateData();

  const preparedData = useMemo(() => {
    if (
      !(
        liquidateAllData &&
        liquidateData &&
        liquidateData.brrowedAssetYToken !== undefined &&
        liquidateData.collateralAssetYToken !== undefined
      )
    ) {
      return undefined;
    }

    const borrowedAssetObject = liquidateAllData.borrowedAssets.find(
      ({ yToken }) => yToken === liquidateData.brrowedAssetYToken
    );
    const collateralAssetObject = liquidateAllData.collateralAssets.find(
      ({ yToken }) => yToken === liquidateData.collateralAssetYToken
    );
    if (!(borrowedAssetObject && collateralAssetObject)) {
      return undefined;
    }
    const liquidBonus = liquidateAllData.liquidationIncentive;

    const maxLiquidateUsd = convertUnits(
      borrowedAssetObject.maxLiquidate,
      borrowedAssetObject.asset.decimals
    ).multipliedBy(borrowedAssetObject.price);
    const amountOfSuppliedUsd = convertUnits(
      collateralAssetObject.amountOfSupplied,
      collateralAssetObject.asset.decimals
    ).multipliedBy(collateralAssetObject.price);

    let maxAmount: BigNumber;
    if (
      maxLiquidateUsd.lte(
        amountOfSuppliedUsd.minus(
          amountOfSuppliedUsd
            .div(liquidBonus.plus(collateralAssetObject.liquidReserveRate))
            .multipliedBy(
              liquidBonus.plus(collateralAssetObject.liquidReserveRate).minus(1)
            )
        )
      )
    ) {
      maxAmount = maxLiquidateUsd
        .div(borrowedAssetObject.price)
        .decimalPlaces(
          borrowedAssetObject.asset.decimals,
          BigNumber.ROUND_DOWN
        );
    } else {
      maxAmount = new BigNumber(
        amountOfSuppliedUsd.minus(
          amountOfSuppliedUsd
            .div(liquidBonus.plus(collateralAssetObject.liquidReserveRate))
            .multipliedBy(
              liquidBonus.plus(collateralAssetObject.liquidReserveRate).minus(1)
            )
        )
      )
        .div(borrowedAssetObject.price)
        .decimalPlaces(
          borrowedAssetObject.asset.decimals,
          BigNumber.ROUND_DOWN
        );
    }

    const borrowedAsset = {
      yToken: borrowedAssetObject.yToken,
      name: getAssetName(borrowedAssetObject.asset),
      decimals: borrowedAssetObject.asset.decimals,
      address: borrowedAssetObject.asset.contractAddress,
      tokenId: borrowedAssetObject.asset.tokenId,
      price: borrowedAssetObject.price,
      maxAmount,
    };
    const collateralAsset = {
      yToken: collateralAssetObject.yToken,
      asset: collateralAssetObject.asset,
      price: collateralAssetObject.price,
    };

    return {
      pureBorrowedAsset: borrowedAssetObject.asset,
      borrowedAsset,
      collateralAsset,
    };
  }, [liquidateData]);

  const { data: balanceData } = useBalance(preparedData?.pureBorrowedAsset);

  const { handleSubmit, control, formState, watch, setFocus, setValue } =
    useForm<FormTypes>({
      defaultValues: {
        amount: new BigNumber(0),
      },
      mode: "onChange",
    });

  const { errors } = formState;

  // Subscribe on input
  const amount = watch("amount");

  useEffect(() => {
    if (preparedData) {
      setValue("amount", new BigNumber(0));
    }
  }, [preparedData, setValue]);

  const youWillRecieveAmount = useMemo(() => {
    if (
      !(
        liquidateAllData &&
        liquidateData &&
        liquidateData.brrowedAssetYToken !== undefined &&
        liquidateData.collateralAssetYToken !== undefined
      )
    ) {
      return undefined;
    }
    const borrowedAssetObject = liquidateAllData.borrowedAssets.find(
      ({ yToken }) => yToken === liquidateData.brrowedAssetYToken
    );
    const collateralAssetObject = liquidateAllData.collateralAssets.find(
      ({ yToken }) => yToken === liquidateData.collateralAssetYToken
    );
    if (!(borrowedAssetObject && collateralAssetObject)) {
      return undefined;
    }
    const liquidBonus = liquidateAllData.liquidationIncentive;
    const bonus = convertUnits(
      convertUnits(amount, -borrowedAssetObject.asset.decimals).multipliedBy(
        liquidBonus.minus(1)
      ),
      borrowedAssetObject.asset.decimals
    )
      .multipliedBy(borrowedAssetObject.price)
      .div(collateralAssetObject.price)
      .decimalPlaces(
        collateralAssetObject.asset.decimals,
        BigNumber.ROUND_DOWN
      );
    const receive = convertUnits(
      convertUnits(amount, -borrowedAssetObject.asset.decimals).plus(
        convertUnits(amount, -borrowedAssetObject.asset.decimals).multipliedBy(
          liquidBonus.minus(1)
        )
      ),
      borrowedAssetObject.asset.decimals
    )
      .multipliedBy(borrowedAssetObject.price)
      .div(collateralAssetObject.price)
      .decimalPlaces(
        collateralAssetObject.asset.decimals,
        BigNumber.ROUND_DOWN
      );
    return {
      receive,
      bonus,
    };
  }, [amount, liquidateAllData, liquidateData]);

  const amountErrorMessage = useMemo(
    () => getAdvancedErrorMessage(errors.amount),
    [errors.amount]
  );

  const validateAmount = useMemo(
    () =>
      assetAmountValidationFactory({
        max: preparedData
          ? preparedData.borrowedAsset.maxAmount
          : new BigNumber(0),
        maxBalance: convertUnits(
          balanceData ?? new BigNumber(0),
          preparedData?.pureBorrowedAsset.decimals,
          true
        ).toString(),
        customMaxMessage: "Amount is bigger then max liquidate amount",
      }),
    [balanceData, preparedData]
  );

  const otherYTokens = useMemo(() => {
    if (!liquidateAllData) {
      return [];
    }
    const finalArr = liquidateAllData.borrowedAssets.map(
      ({ yToken }) => yToken
    );

    liquidateAllData.collateralAssets.forEach(({ yToken }) => {
      if (finalArr.indexOf(yToken) === -1) {
        finalArr.push(yToken);
      }
    });

    return finalArr;
  }, [liquidateAllData]);

  // Submit form
  const onSubmit = useCallback(
    async ({ amount: inputAmount }: FormTypes) => {
      try {
        if (preparedData) {
          setOperationLoading(true);
          const params = {
            fabricaContractAddress: fabrica,
            proxyContractAddress: priceFeedProxy,
            otherYTokens,
            borrowToken: preparedData.borrowedAsset.yToken,
            collateralToken: preparedData.collateralAsset.yToken,
            tokenContract: preparedData.borrowedAsset.address,
            tokenId: preparedData.borrowedAsset.tokenId,
            borrower: borrowerAddress,
            amount: convertUnits(
              inputAmount,
              -preparedData.borrowedAsset.decimals
            ),
          };
          const operation = await liquidate(tezos, accountPkh!, params);
          updateToast({
            type: "info",
            render: `Request for ${getAssetName(
              preparedData.borrowedAsset as unknown as AssetType
            )} Liquidate. You can follow your transaction in transaction history.`,
          });
          addTransaction({
            type: "Liquidation",
            amount: inputAmount,
            name: preparedData.borrowedAsset.name,
            opHash: operation.opHash,
            status: Status.PENDING,
            timestamp: Date.now(),
          });
          await operation.confirmation(1);
          updateToast({
            type: "info",
            render: `The ${getAssetName(
              preparedData.borrowedAsset as unknown as AssetType
            )} Liquidate request was successful, please wait...`,
          });
        }
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
    [
      accountPkh,
      addTransaction,
      borrowerAddress,
      fabrica,
      preparedData,
      priceFeedProxy,
      tezos,
      updateToast,
      otherYTokens,
    ]
  );

  return (
    <section className={s.section}>
      <h2 className={s.title}>
        {isWiderThanMphone ? (
          "Step 3 — Liquidate debt address"
        ) : (
          <>
            Step 3<span className={s.subtitle}>Liquidate debt address</span>
          </>
        )}
      </h2>
      <div className={s.description}>
        Now you can liquidate the debtor. Be aware that the amount to be
        liquidated cannot exceed the MAX Liquidate of the debt.
      </div>
      <Heading
        title={
          preparedData
            ? `Amount to close in ${
                preparedData.borrowedAsset.address === WTEZ_CONTRACT
                  ? "TEZ"
                  : preparedData.borrowedAsset.name
              }:`
            : "Complete all the previous steps first:"
        }
        className={s.heading}
      />
      <div className={s.liquidateWrapper}>
        <form
          onSubmit={handleSubmit(onSubmit as any)}
          className={s.inputWrapper}
        >
          <Controller
            name="amount"
            control={control}
            rules={{ validate: validateAmount }}
            render={({ field }) => (
              // @ts-ignore
              <NumberInput
                theme="primary"
                decimals={preparedData?.borrowedAsset.decimals ?? 0}
                error={amountErrorMessage}
                maxValue={preparedData?.borrowedAsset.maxAmount}
                withSlider={false}
                setFocus={() => setFocus("amount")}
                exchangeRate={preparedData?.borrowedAsset.price}
                className={s.input}
                disabled={!preparedData}
                {...field}
              />
            )}
          />
          {accountPkh ? (
            <Button
              type="submit"
              disabled={
                !!amountErrorMessage ||
                !preparedData ||
                operationLoading ||
                isTransactionLoading
              }
              className={cx(s.button, { [s.error]: amountErrorMessage })}
            >
              {operationLoading || isTransactionLoading ? (
                <PendingIcon isTransparent />
              ) : (
                "Liquidate"
              )}
            </Button>
          ) : (
            <ConnectWalletButton
              actionT="supply"
              className={cx(s.button, { [s.error]: amountErrorMessage })}
            />
          )}
        </form>

        <div className={s.recieveInfo}>
          <div className={s.recieveColumn}>
            <div className={s.recieveTitle}>You will receive:</div>

            <div className={s.recieveValue}>
              {youWillRecieveAmount && preparedData ? (
                <>
                  <PrettyAmount
                    amount={youWillRecieveAmount.receive}
                    currency={getAssetName(preparedData.collateralAsset.asset)}
                  />
                  {" ("}
                  <PrettyAmount
                    amount={youWillRecieveAmount.receive.multipliedBy(
                      preparedData.collateralAsset.price
                    )}
                    isConvertable
                  />
                  {")"}
                </>
              ) : (
                "—"
              )}
            </div>
          </div>
          <div className={s.recieveColumn}>
            <div className={s.recieveTitle}>Your bonus:</div>

            <div className={s.recieveValue}>
              {youWillRecieveAmount && preparedData ? (
                <>
                  <PrettyAmount
                    amount={youWillRecieveAmount.bonus}
                    currency={getAssetName(preparedData.collateralAsset.asset)}
                  />
                  {" ("}
                  <PrettyAmount
                    amount={youWillRecieveAmount.bonus.multipliedBy(
                      preparedData.collateralAsset.price
                    )}
                    isConvertable
                  />
                  {")"}
                </>
              ) : (
                "—"
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

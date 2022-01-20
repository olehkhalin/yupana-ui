import React, {
  useEffect, useCallback, useMemo, useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { ORACLE_PRICE_PRECISION } from 'constants/default';
import { ModalActions } from 'types/modal';
import { TokenMetadataInterface } from 'types/token';
import {
  getSliceTokenName,
  getTokenName,
} from 'utils/helpers/token';
import {
  getPrettyPercent,
  getPrettyAmount,
  convertUnits,
} from 'utils/helpers/amount';
import { useWiderThanMphone } from 'utils/helpers';
import {
  assetAmountValidationFactory,
  getAdvancedErrorMessage,
} from 'utils/validation';
import useUpdateToast from 'utils/useUpdateToast';
import { useProcessCredit } from 'providers/ProcessCreditProvider';
import { OraclePriceType } from 'providers/OraclePricesProvider';
import { useCurrency } from 'providers/CurrencyProvider';
import { Modal } from 'components/ui/Modal';
import { NumberInput } from 'components/common/NumberInput';
import { Button } from 'components/ui/Button';
import { TokenLogo } from 'components/ui/TokenLogo';

import s from './CreditProcessModal.module.sass';

export enum TypeEnum {
  SUPPLY = 'supply',
  WITHDRAW = 'withdraw',
  BORROW = 'borrow',
  REPAY = 'repay',
}

export type FormTypes = {
  amount: BigNumber
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

type CreditProcessModalInnerProps = {
  theme?: keyof typeof themeClasses
  asset: TokenMetadataInterface
  borrowLimit: BigNumber
  borrowLimitUsed: BigNumber
  dynamicBorrowLimitFunc?: (input: BigNumber) => BigNumber
  dynamicBorrowLimitUsedFunc: (input: BigNumber) => BigNumber
  title: string
  balanceLabel: string
  maxAmount: BigNumber
  onSubmit: any
  oraclePrice: OraclePriceType
} & Pick<ModalActions, 'isOpen' | 'onRequestClose'>;

export const CreditProcessModalInner: React.FC<CreditProcessModalInnerProps> = ({
  theme = 'primary',
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
  onSubmit,
  oraclePrice,
}) => {
  const updateToast = useUpdateToast();
  const isWiderThanMphone = useWiderThanMphone();
  const { convertPriceByBasicCurrency } = useCurrency();
  const [dynamicBorrowLimit, setDynamicBorrowLimit] = useState(new BigNumber(0));
  const [dynamicBorrowLimitUsed, setDynamicBorrowLimitUsed] = useState(new BigNumber(0));
  const [operationLoading, setOperationLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState,
    watch,
    setFocus,
  } = useForm<FormTypes>({
    defaultValues: {
      amount: new BigNumber(0),
    },
    mode: 'onChange',
  });

  const { errors } = formState;

  // Subscribe on input
  const amount = watch('amount');

  useEffect(() => {
    if (dynamicBorrowLimitFunc) {
      setDynamicBorrowLimit(dynamicBorrowLimitFunc(amount));
    }
    setDynamicBorrowLimitUsed(dynamicBorrowLimitUsedFunc(amount));
  }, [amount, dynamicBorrowLimitFunc, dynamicBorrowLimitUsedFunc]);

  const validateAmount = useMemo(
    () => (assetAmountValidationFactory({ max: convertUnits(maxAmount, asset.decimals) })),
    [asset.decimals, maxAmount],
  );

  const amountErrorMessage = useMemo(
    () => getAdvancedErrorMessage(errors.amount),
    [errors.amount],
  );

  const amountWarningMessage = useMemo(
    () => (theme === 'secondary' && amount && amount.div(convertUnits(maxAmount, asset.decimals)).gte(0.8)
      ? 'Beware of the Liquidation Risk'
      : undefined),
    [amount, asset.decimals, maxAmount, theme],
  );

  // Form submit
  const onSubmitInner = useCallback(
    async ({ amount: inputData }: FormTypes) => {
      const finalAmount = convertUnits(inputData, -(asset.decimals ?? 0));
      try {
        setOperationLoading(true);
        await onSubmit(finalAmount);
        onRequestClose();
      } catch (e) {
        updateToast({
          type: 'error',
          // @ts-ignore
          render: e.message,
        });
      } finally {
        setOperationLoading(false);
      }
    },
    [asset.decimals, onRequestClose, onSubmit, updateToast],
  );

  const borrowLimitF = useMemo(() => {
    const borrowLimitVal = convertPriceByBasicCurrency(borrowLimit);

    if (dynamicBorrowLimitFunc) {
      return `${borrowLimitVal} -> ${convertPriceByBasicCurrency(dynamicBorrowLimit)}`;
    }

    return borrowLimitVal;
  }, [borrowLimit, convertPriceByBasicCurrency, dynamicBorrowLimit, dynamicBorrowLimitFunc]);

  const isBorrowTheme = theme === 'secondary';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      innerClassName={s.inner}
      theme={theme}
      className={cx(s.root, { [s.borrow]: isBorrowTheme })}
    >
      <form
        onSubmit={handleSubmit(onSubmitInner as any)}
        className={s.form}
      >
        <h2 className={s.title}>
          {title}
        </h2>

        <div className={s.tokenInfo}>
          <TokenLogo
            sizeT={isWiderThanMphone ? 'large' : 'medium'}
            logo={{ name: getTokenName(asset), thumbnailUri: asset.thumbnailUri }}
            className={s.icon}
          />
          {getTokenName(asset, true)}
        </div>

        <div className={s.walletBalance}>
          {balanceLabel}

          <div className={s.balance}>
            {getPrettyAmount({
              value: convertUnits(maxAmount, asset.decimals),
              currency: getSliceTokenName(asset),
              dec: asset.decimals,
            })}
          </div>
        </div>

        <Controller
          name="amount"
          control={control}
          rules={{ validate: validateAmount }}
          render={
            ({ field }) => (
              // @ts-ignore
              <NumberInput
                theme={theme}
                decimals={asset.decimals ?? 0}
                error={amountErrorMessage || amountWarningMessage}
                className={s.input}
                maxValue={convertUnits(maxAmount, asset.decimals)}
                setFocus={() => setFocus('amount')}
                exchangeRate={
                  convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION)
                    .multipliedBy(oraclePrice.decimals)
                }
                {...field}
              />
            )
          }
        />

        <h2 className={s.borrowTitle}>
          Borrow limit
        </h2>

        <div className={s.borrowLimit}>
          <div className={s.borrowDescription}>
            {dynamicBorrowLimitFunc ? 'Available to borrow:' : 'Your Borrow Limit:'}
          </div>
          <div className={s.borrowResult}>
            {borrowLimitF}
          </div>
        </div>

        <div className={s.borrowLimitUsed}>
          <div className={s.borrowDescription}>
            Borrow Limit Used:
          </div>
          <div className={s.borrowResult}>
            {getPrettyPercent(borrowLimitUsed)}
            {' -> '}
            {getPrettyPercent(dynamicBorrowLimitUsed)}
          </div>
        </div>

        <Button
          sizeT={isWiderThanMphone ? 'large' : 'medium'}
          actionT={isBorrowTheme ? 'borrow' : 'supply'}
          type="submit"
          disabled={!!amountErrorMessage || operationLoading || maxAmount.eq(0)}
        >
          {operationLoading ? 'Loading...' : title}
        </Button>
      </form>
    </Modal>
  );
};

const getModalLabels = (type: TypeEnum) => {
  switch (type) {
    case TypeEnum.SUPPLY:
      return ({
        title: 'Supply',
        balanceLabel: 'Wallet balance:',
      });
    case TypeEnum.WITHDRAW:
      return ({
        title: 'Withdraw',
        balanceLabel: 'Supply balance:',
      });
    case TypeEnum.BORROW:
      return ({
        title: 'Borrow',
        balanceLabel: 'Borrow balance:',
      });
    default:
      return ({
        title: 'Repay',
        balanceLabel: 'Borrow balance:',
      });
  }
};

export const CreditProcessModal = () => {
  const { processCreditData, setProcessCreditData } = useProcessCredit();

  const handleModalClose = () => setProcessCreditData(null);

  if (processCreditData === null) {
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
  } = processCreditData;

  return (
    <CreditProcessModalInner
      maxAmount={maxAmount}
      asset={asset}
      borrowLimit={borrowLimit}
      dynamicBorrowLimitFunc={dynamicBorrowLimitFunc}
      borrowLimitUsed={borrowLimitUsed}
      dynamicBorrowLimitUsedFunc={dynamicBorrowLimitUsedFunc}
      theme={(type === TypeEnum.SUPPLY || type === TypeEnum.WITHDRAW) ? 'primary' : 'secondary'}
      isOpen
      onRequestClose={handleModalClose}
      onSubmit={onSubmit}
      oraclePrice={oraclePrice}
      {...getModalLabels(type)}
    />
  );
};

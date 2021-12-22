import React, {
  useEffect, useCallback, useMemo, useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { ModalActions } from 'types/modal';
import { TokenMetadataInterface } from 'types/token';
import { getTokenName } from 'utils/helpers/token';
import {
  getPrettyPercent,
  getPrettyAmount,
} from 'utils/helpers/amount';
import { useWiderThanMphone } from 'utils/helpers';
import {
  assetAmountValidationFactory,
  getAdvancedErrorMessage,
} from 'utils/validation';
import { useProcessCredit } from 'providers/ProcessCreditProvider';
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

type FormTypes = {
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
  // onSumbit: (props: any) => void
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
  // onSumbit,
}) => {
  const isWiderThanMphone = useWiderThanMphone();
  const [dynamicBorrowLimit, setDynamicBorrowLimit] = useState(new BigNumber(0));
  const [dynamicBorrowLimitUsed, setDynamicBorrowLimitUsed] = useState(new BigNumber(0));

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
    () => (assetAmountValidationFactory({
      max: maxAmount,
      isLiquidationRiskIncluded: theme === 'secondary',
    })),
    [maxAmount, theme],
  );

  const amountErrorMessage = useMemo(
    () => getAdvancedErrorMessage(errors.amount),
    [errors.amount],
  );

  // Form submit
  const onSubmit = useCallback(
    ({ amount: inputData }: FormTypes) => {
      console.log('inputData', inputData);
    },
    [],
  );

  const getYourBorrowLimit = () => {
    const borrowLimitVal = getPrettyAmount({ value: borrowLimit, currency: '$' });

    if (dynamicBorrowLimitFunc) {
      return (
        <>
          {borrowLimitVal}
          {' -> '}
          {getPrettyAmount({ value: dynamicBorrowLimit ?? 0, currency: '$' })}
        </>
      );
    }

    return borrowLimitVal;
  };

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
        // TODO: Update 'any' type
        onSubmit={handleSubmit(onSubmit as any)}
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
            {maxAmount.toString()}
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
                decimals={6}
                error={amountErrorMessage}
                className={s.input}
                maxValue={new BigNumber(maxAmount)}
                setFocus={() => setFocus('amount')}
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
            {getYourBorrowLimit()}
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
          disabled={(!!amountErrorMessage && amountErrorMessage !== 'Beware of the Liquidation Risk')}
        >
          {title}
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
      {...getModalLabels(type)}
    />
  );
};

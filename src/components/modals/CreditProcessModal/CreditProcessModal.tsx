import React, {
  useEffect, useCallback, useMemo,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { ModalActions } from 'types/modal';
import { TokenMetadataInterface } from 'types/token';
import { getTokenName } from 'utils/helpers/token';
import {
  convertTokenAmountToDollars,
  getPrettyPercent,
  getPrettyAmount,
} from 'utils/helpers/amount';
import { useWiderThanMphone } from 'utils/helpers';
import {
  assetAmountValidationFactory,
  getAdvancedErrorMessage,
} from 'utils/validation';
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

// export type AssetModalProps = ModalActionType & CreditProcessProps;

export type ModalActionType = Pick<ModalActions, 'isOpen' | 'onRequestClose'>;

type CreditProcessModalProps = {
  type?: TypeEnum
  theme?: keyof typeof themeClasses
  // new props
  asset: TokenMetadataInterface
  // TODO: Change to basic currency name
  pricePerTokenInBasicCurrency: number
  // Stats
  yourBorrowLimit: number
  borrowLimitUsed: number
  dynamicBorrowLimitUsed: number
  dynamicBorrowLimit?: number
  // *
  title: string
  balanceLabel: string
  buttonLabel: string
  maxAmount: number
  // onSumbit: (props: any) => void
  setIntroducedValueInBasicPrice: (arg: number) => void
} & ModalActionType;

export const CreditProcessModal: React.FC<CreditProcessModalProps> = ({
  type = TypeEnum.SUPPLY,
  theme = 'primary',
  isOpen,
  onRequestClose,
  // new props
  asset,
  yourBorrowLimit,
  borrowLimitUsed,
  pricePerTokenInBasicCurrency,
  dynamicBorrowLimitUsed,
  dynamicBorrowLimit,
  title,
  balanceLabel,
  buttonLabel,
  maxAmount,
  // onSumbit,
  setIntroducedValueInBasicPrice,
}) => {
  const isWiderThanMphone = useWiderThanMphone();

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

  // Entered amount of tokens in USD // TODO: maybe change to usememo
  useEffect(() => {
    // Add switch currency to tezos/dollars (pricePerTokenInDollars / tezosPrice * inputAmount)
    setIntroducedValueInBasicPrice(
      convertTokenAmountToDollars(+amount, pricePerTokenInBasicCurrency),
    );
  }, [amount, pricePerTokenInBasicCurrency, setIntroducedValueInBasicPrice]);

  const validateAmount = useMemo(
    () => (assetAmountValidationFactory({
      max: maxAmount,
      isLiquidationRiskIncluded: type === TypeEnum.BORROW || type === TypeEnum.REPAY,
    })),
    [maxAmount, type],
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
    const borrowLimit = getPrettyAmount({ value: yourBorrowLimit, currency: '$' });

    if (dynamicBorrowLimit) {
      return (
        <>
          {borrowLimit}
          {' -> '}
          {getPrettyAmount({ value: dynamicBorrowLimit ?? 0, currency: '$' })}
        </>
      );
    }

    return borrowLimit;
  };

  const isBorrowTheme = type === TypeEnum.BORROW || type === TypeEnum.REPAY;

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
            {maxAmount}
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
            {type === TypeEnum.WITHDRAW ? 'Available to borrow:' : 'Your Borrow Limit:'}
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
          {buttonLabel}
        </Button>
      </form>
    </Modal>
  );
};

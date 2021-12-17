/* eslint-disable max-len */
import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { ModalActions } from 'types/modal';
import { TokenMetadataInterface } from 'types/token';
import { getTokenName } from 'utils/helpers/token';
import {
  getThePercentageOfTheNumber,
  convertTokenAmountToDollars,
  getPrettyPercent,
  getPrettyAmount,
} from 'utils/helpers/amount';
import { useWiderThanMphone } from 'utils/helpers';
import { Modal } from 'components/ui/Modal';
import { NumberInput } from 'components/common/NumberInput';
import { Button } from 'components/ui/Button';
import { Slider } from 'components/ui/Slider';
import { TokenLogo } from 'components/ui/TokenLogo';
import { DECIMALS_VALUE } from 'constants/default';

import s from './CreditProcessModal.module.sass';

export enum TypeEnum {
  SUPPLY = 'supply',
  WITHDRAW = 'withdraw',
  BORROW = 'borrow',
  REPAY = 'repay',
}

export interface InputInterface {
  metadata: TokenMetadataInterface
  amount: BigNumber
}

type FormTypes = {
  input: InputInterface
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

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
  tokenBalance: string
  onSumbit: (props: any) => void
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
  tokenBalance,
  onSumbit,
  setIntroducedValueInBasicPrice,
}) => {
  const isWiderThanMphone = useWiderThanMphone();

  const [sliderValue, setSliderValue] = useState<number>(0);
  /*  TODO: numberInputStringValue - If possible update later
      Can't input any float number without this 'string' value
  */
  const [numberInputStringValue, setNumberInputStringValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const valueRef = useRef<HTMLDivElement | null>(null);

  const {
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormTypes>({
    defaultValues: {
      input: {
        amount: new BigNumber(0),
        metadata: asset,
      },
    },
  });

  // Subscribe on input
  const { amount } = watch('input');

  // Entered amount of tokens in USD
  useEffect(() => {
    // Add switch currency to tezos/dollars (pricePerTokenInDollars / tezosPrice * inputAmount)
    setIntroducedValueInBasicPrice(
      convertTokenAmountToDollars(+amount, pricePerTokenInBasicCurrency),
    );
  }, [amount, pricePerTokenInBasicCurrency, setIntroducedValueInBasicPrice]);

  // Set tooltip offset
  const setTooltipOffset = useCallback(
    (percent) => {
      if (valueRef && valueRef.current) {
        valueRef.current.style.left = `${percent / 1.1}%`;
      }
    },
    [],
  );

  // Input change
  const handleInputChange = useCallback(
    (newAmount: BigNumber) => {
      setValue('input', {
        amount: newAmount,
        metadata: asset,
      });

      if (newAmount && newAmount.lte(maxAmount)) {
        const numberByPercent = (+newAmount / maxAmount) * 100;
        setSliderValue(numberByPercent);
        setTooltipOffset(numberByPercent);
      } else if (newAmount?.gt(maxAmount)) {
        setSliderValue(100);
        setTooltipOffset(100);
      } else if (!newAmount || +newAmount === 0) {
        setSliderValue(0);
        setTooltipOffset(0);
      }
    }, [asset, maxAmount, setTooltipOffset, setValue],
  );

  // Counting input value relatively input percent
  const setAmountEqualPercent = useCallback(
    (percent: number) => {
      const value = getThePercentageOfTheNumber(maxAmount, percent);
      setValue('input', {
        amount: new BigNumber(value).decimalPlaces(asset.decimals ?? DECIMALS_VALUE),
        metadata: asset,
      });
      setNumberInputStringValue(
        new BigNumber(value)
          .decimalPlaces(asset.decimals ?? DECIMALS_VALUE)
          .toFixed(),
      );
    },
    [asset, maxAmount, setValue],
  );

  // Set data by interaction with slider
  const setDataDueToInteractionWithSlider = useCallback(
    (percent: number) => {
      setTooltipOffset(percent);
      setSliderValue(percent);
      setAmountEqualPercent(percent);
      setError('');
    },
    [setAmountEqualPercent, setTooltipOffset],
  );

  // Slider change
  const handleSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDataDueToInteractionWithSlider(+event.target.value);
    },
    [setDataDueToInteractionWithSlider],
  );

  // Change slider by percent buttons
  const handleClickByPercentButton = useCallback(
    (value: number) => {
      setDataDueToInteractionWithSlider(value);
    },
    [setDataDueToInteractionWithSlider],
  );

  // Validate input
  const validateInput = useCallback(
    ({
      inputAmount,
      maxInputValue,
      percent = 0,
      submit = false,
    }: {
      inputAmount?: BigNumber
      maxInputValue: number
      percent?: number
      submit?: boolean
    }) => {
      const LIQUIDATION_RISK_PERCENT = 80;

      if (inputAmount?.gt(maxInputValue)) {
        return setError('Insufficient Balance');
      }

      if ((!inputAmount || (inputAmount && +inputAmount === 0)) && submit) {
        return setError('This field is required');
      }

      if (percent >= LIQUIDATION_RISK_PERCENT && inputAmount?.lte(maxInputValue)) {
        return setError('Beware of the Liquidation Risk');
      }

      return setError('');
    },
    [],
  );

  // Credit process types
  useEffect(() => {
    switch (type) {
      // Supply
      case TypeEnum.SUPPLY:
        validateInput({
          inputAmount: new BigNumber(amount),
          maxInputValue: maxAmount,
        });
        break;
      // Withdraw
      case TypeEnum.WITHDRAW:
        validateInput({
          inputAmount: new BigNumber(amount),
          maxInputValue: maxAmount,
        });
        break;
      // Borrow
      case TypeEnum.BORROW:
        validateInput({
          inputAmount: new BigNumber(amount),
          maxInputValue: maxAmount,
          percent: dynamicBorrowLimitUsed,
        });
        break;
      // Repay
      case TypeEnum.REPAY:
        validateInput({
          inputAmount: new BigNumber(amount),
          maxInputValue: maxAmount,
          percent: dynamicBorrowLimitUsed,
        });
        break;
      default:
        validateInput({
          inputAmount: new BigNumber(amount),
          maxInputValue: maxAmount,
        });
        break;
    }
  }, [amount, dynamicBorrowLimitUsed, maxAmount, type, validateInput]);

  // Form submit
  const onSubmit = useCallback(
    ({ input: inputData }: FormTypes) => {
      validateInput({
        inputAmount: new BigNumber(amount),
        maxInputValue: maxAmount,
        submit: true,
      });

      if (!error && (!amount.eq(0) && amount)) {
        // Send data to parent submit function
        onSumbit(inputData);
      }
    },
    [validateInput, amount, maxAmount, error, onSumbit],
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
            {tokenBalance}
          </div>
        </div>

        <NumberInput
          theme={theme}
          input={{ amount: numberInputStringValue, metadata: asset }}
          // TODO: Current currency Tezos ? tezos.currentPrice : priceInUsd
          priceInBaseCurrency={pricePerTokenInBasicCurrency}
          handleInputChange={handleInputChange}
          error={error}
          setError={setError}
          balance={maxAmount}
          isShowMaxButton={type !== TypeEnum.BORROW}
          className={s.input}
        />

        <Slider
          theme={theme}
          value={isWiderThanMphone ? sliderValue.toFixed(2) : sliderValue.toFixed()}
          onChange={handleSliderChange}
          handleClickByPercentButton={handleClickByPercentButton}
          valueRef={valueRef}
          className={s.slider}
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
          disabled={(!!error && error !== 'Beware of the Liquidation Risk')}
        >
          {buttonLabel}
        </Button>
      </form>
    </Modal>
  );
};

/* eslint-disable max-len */
import React, {
  useState, useEffect, useCallback, useRef, useMemo,
} from 'react';
import { useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { ModalActions } from 'types/modal';
import { TokenMetadataInterface } from 'types/token';
import { getTokenName } from 'utils/helpers/token';
import {
  convertDollarsToTokenAmount,
  getPercentIsOneNumberFromAnother,
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

type CreditProcessModalProps = {
  type?: TypeEnum
  theme?: keyof typeof themeClasses
  asset: TokenMetadataInterface
  tokenBalance: number
  yourBorrowLimit: number
  borrowLimitUsed: number
  priceInUsd: number
  supplyBalance: number
  collateralFactor: number
  borrowByCurrentToken?: number
} & Pick<ModalActions, 'isOpen' | 'onRequestClose'>;

type DataType = {
  text: string
  balanceTitle: string
  tokenAmount: string
  balance: number
};

export interface InputInterface {
  metadata: TokenMetadataInterface
  amount: BigNumber
}

type FormTypes = {
  input: InputInterface
};

const defaultData = {
  text: '',
  balanceTitle: '',
  tokenAmount: '',
  balance: 0,
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const CreditProcessModal: React.FC<CreditProcessModalProps> = ({
  type = TypeEnum.SUPPLY,
  theme = 'primary',
  asset,
  tokenBalance,
  yourBorrowLimit,
  borrowLimitUsed,
  priceInUsd,
  collateralFactor,
  supplyBalance,
  borrowByCurrentToken = 0,
  isOpen,
  onRequestClose,
}) => {
  const [{
    text, balanceTitle, tokenAmount, balance,
  }, setData] = useState<DataType>(defaultData);
  const [sliderValue, setSliderValue] = useState<number>(0);
  /*  TODO: numberInputStringValue - If possible update later
      Can't input any float number without this 'string' value
  */
  const [numberInputStringValue, setNumberInputStringValue] = useState<string>('');
  const [yourTotalBorrowLimit, setYourTotalBorrowLimit] = useState<number>(0);
  const [
    yourBorrowLimitUsedEqualNewSupply, setYourBorrowLimitUsedEqualNewSupply,
  ] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const valueRef = useRef<HTMLDivElement | null>(null);
  const isWiderThanMphone = useWiderThanMphone();

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

  const isBorrowTheme = type === TypeEnum.BORROW || type === TypeEnum.REPAY;

  // Subscribe on input
  const { amount } = watch('input');

  // Entered amount of tokens in USD
  const tokenAmountInDollars = useMemo(
    () => convertTokenAmountToDollars(+amount, priceInUsd),
    [amount, priceInUsd],
  );

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

      if (newAmount && newAmount.lte(balance)) {
        const numberByPercent = (+newAmount / balance) * 100;
        setSliderValue(numberByPercent);
        setTooltipOffset(numberByPercent);
      } else if (newAmount?.gt(balance)) {
        setSliderValue(100);
        setTooltipOffset(100);
      } else if (!newAmount || +newAmount === 0) {
        setSliderValue(0);
        setTooltipOffset(0);
      }
    }, [asset, balance, setTooltipOffset, setValue],
  );

  // Counting input value relatively input percent
  const setAmountEqualPercent = useCallback(
    (percent: number) => {
      const value = getThePercentageOfTheNumber(balance, percent);
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
    [asset, balance, setValue],
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
      userBalance,
      percent = 0,
      submit = false,
    }: {
      inputAmount?: BigNumber
      userBalance: number
      percent?: number
      submit?: boolean
    }) => {
      const LIQUIDATION_RISK_PERCENT = 80;

      if (inputAmount?.gt(userBalance)) {
        return setError('Insufficient Balance');
      }

      if ((!inputAmount || (inputAmount && +inputAmount === 0)) && submit) {
        return setError('This field is required');
      }

      if (percent >= LIQUIDATION_RISK_PERCENT && inputAmount?.lte(userBalance)) {
        return setError('Beware of the Liquidation Risk');
      }

      return setError('');
    },
    [],
  );

  // Credit process types
  useEffect(() => {
    const currentBorrowLimitUsedInDollars = getThePercentageOfTheNumber(yourBorrowLimit, borrowLimitUsed);

    let yourBorrowLimitEqualInputAmount = 0;
    let borrowLimitUsedEqualInputAmount = 0;

    switch (type) {
      case TypeEnum.SUPPLY:
        yourBorrowLimitEqualInputAmount = getThePercentageOfTheNumber(tokenAmountInDollars, collateralFactor) + yourBorrowLimit;
        borrowLimitUsedEqualInputAmount = getPercentIsOneNumberFromAnother(currentBorrowLimitUsedInDollars, yourTotalBorrowLimit);

        validateInput({
          inputAmount: new BigNumber(amount),
          userBalance: tokenBalance,
        });

        setData({
          text: 'Supply',
          balanceTitle: 'Wallet balance:',
          tokenAmount: getPrettyAmount({
            value: tokenBalance,
            currency: getTokenName(asset),
            dec: asset.decimals,
          }),
          balance: tokenBalance,
        });
        break;
      case TypeEnum.WITHDRAW: {
        yourBorrowLimitEqualInputAmount = yourBorrowLimit - (currentBorrowLimitUsedInDollars + getThePercentageOfTheNumber(
          tokenAmountInDollars,
          collateralFactor,
        ));
        borrowLimitUsedEqualInputAmount = getPercentIsOneNumberFromAnother(
          (currentBorrowLimitUsedInDollars + getThePercentageOfTheNumber(
            tokenAmountInDollars,
            collateralFactor,
          )), yourBorrowLimit,
        );

        /*  1. (currentBorrowLimitUsedInUsd * 100) / collateralFactor)
              How many dollars a user should have to cover his debt
            2. amountUsdToWithdraw
              Subtract from the total supplyBalance
            3. tokenBorrow
              Max token amount to withdraw
        */
        const amountUsdToWithdraw = supplyBalance - ((currentBorrowLimitUsedInDollars * 100) / collateralFactor);
        const tokenBorrow = convertDollarsToTokenAmount(amountUsdToWithdraw, priceInUsd);

        validateInput({
          userBalance: tokenBorrow,
          inputAmount: new BigNumber(amount),
        });

        setData({
          text: 'Withdraw',
          balanceTitle: 'Available to withdraw:',
          tokenAmount: getPrettyAmount({
            value: tokenBorrow,
            currency: getTokenName(asset),
            dec: asset.decimals,
          }),
          balance: tokenBorrow,
        });
      }
        break;
      case TypeEnum.BORROW: {
        const amountUsdToWithdraw = yourBorrowLimit - currentBorrowLimitUsedInDollars;
        const tokenBorrow = convertDollarsToTokenAmount(amountUsdToWithdraw, priceInUsd);

        borrowLimitUsedEqualInputAmount = getPercentIsOneNumberFromAnother(tokenAmountInDollars, yourBorrowLimit) + borrowLimitUsed;

        validateInput({
          percent: borrowLimitUsedEqualInputAmount,
          userBalance: tokenBorrow,
          inputAmount: new BigNumber(amount),
        });

        setData({
          text: 'Borrow',
          balanceTitle: 'Available to borrow:',
          tokenAmount: getPrettyAmount({
            value: tokenBorrow,
            currency: getTokenName(asset),
            dec: asset.decimals,
          }),
          balance: tokenBorrow,
        });
      }
        break;
      case TypeEnum.REPAY: {
        borrowLimitUsedEqualInputAmount = getPercentIsOneNumberFromAnother(currentBorrowLimitUsedInDollars - tokenAmountInDollars, yourBorrowLimit);

        const tokenBorrow = convertDollarsToTokenAmount(borrowByCurrentToken, priceInUsd);

        validateInput({
          percent: borrowLimitUsedEqualInputAmount,
          userBalance: tokenBorrow,
          inputAmount: new BigNumber(amount),
        });

        setData({
          text: 'Repay',
          balanceTitle: 'Available to repay:',
          tokenAmount: getPrettyAmount({
            value: tokenBorrow,
            currency: getTokenName(asset),
            dec: asset.decimals,
          }),
          balance: tokenBorrow,
        });
      }
        break;
      default:
        setData(defaultData);
        break;
    }

    setYourBorrowLimitUsedEqualNewSupply(borrowLimitUsedEqualInputAmount);
    setYourTotalBorrowLimit(yourBorrowLimitEqualInputAmount);
  }, [amount, asset, borrowByCurrentToken, borrowLimitUsed, collateralFactor, priceInUsd, supplyBalance, tokenAmountInDollars, tokenBalance, type, validateInput, yourBorrowLimit, yourTotalBorrowLimit]);

  // Form submit
  const onSubmit = useCallback(
    ({ input: inputData }: FormTypes) => {
      validateInput({
        inputAmount: new BigNumber(amount),
        userBalance: tokenBalance,
        submit: true,
      });

      if (!error && (!amount.eq(0) && amount)) {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(inputData, null, 2));
      }
    },
    [amount, tokenBalance, error, validateInput],
  );

  const getYourBorrowLimit = () => {
    const borrowLimit = getPrettyAmount({ value: yourBorrowLimit, currency: '$' });
    if (isBorrowTheme) {
      return borrowLimit;
    }

    return (
      <>
        {borrowLimit}
        {' -> '}
        {getPrettyAmount({ value: yourTotalBorrowLimit, currency: '$' })}
      </>
    );
  };

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
          {text}
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
          {balanceTitle}

          <div className={s.balance}>
            {tokenAmount}
          </div>
        </div>

        <NumberInput
          theme={theme}
          input={{ amount: numberInputStringValue, metadata: asset }}
          // TODO: Current currency Tezos ? tezos.currentPrice : priceInUsd
          priceInBaseCurrency={priceInUsd}
          handleInputChange={handleInputChange}
          error={error}
          setError={setError}
          balance={balance}
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
            {getPrettyPercent(yourBorrowLimitUsedEqualNewSupply)}
          </div>
        </div>

        <Button
          sizeT={isWiderThanMphone ? 'large' : 'medium'}
          actionT={isBorrowTheme ? 'borrow' : 'supply'}
          type="submit"
          disabled={(!!error && error !== 'Beware of the Liquidation Risk')}
        >
          {text}
        </Button>
      </form>
    </Modal>
  );
};

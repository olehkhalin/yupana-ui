/* eslint-disable max-len */
import React, {
  useState, useEffect, useCallback, useRef, useMemo,
} from 'react';
import { useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { ModalActions } from 'types/modal';
import { TokenMetadataWithBalanceInterface } from 'types/token';
import { getTokenName } from 'utils/getTokenName';
import { getThePercentageOfTheNumber } from 'utils/getThePercentageOfTheNumber';
import { getTokenPriceInUsd } from 'utils/getTokePriceInUsd';
import { getPrettyPercent } from 'utils/getPrettyPercent';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { useWiderThanMphone } from 'utils/getMediaQuery';
import { validateInput } from 'utils/validateInput';
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
  asset: TokenMetadataWithBalanceInterface
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
  metadata: TokenMetadataWithBalanceInterface
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

  // Token price in USD
  const tokenPriceInUsd = useMemo(
    () => getTokenPriceInUsd(asset.balance, priceInUsd),
    [asset.balance, priceInUsd],
  );

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

  // Counting your borrow limit used with new Supply
  useEffect(() => {
    const currentBorrowLimitUsedInUsd = getThePercentageOfTheNumber(yourBorrowLimit, borrowLimitUsed);

    let borrowLimitUsedEqualNewSupply = 0;
    let finalBorrowLimit = 0;

    if (type === TypeEnum.SUPPLY) {
      finalBorrowLimit = getThePercentageOfTheNumber(
        getTokenPriceInUsd(+amount, priceInUsd),
        collateralFactor,
      ) + yourBorrowLimit;
      borrowLimitUsedEqualNewSupply = (currentBorrowLimitUsedInUsd / yourTotalBorrowLimit) * 100;
    } else if (type === TypeEnum.WITHDRAW) {
      finalBorrowLimit = yourBorrowLimit - (currentBorrowLimitUsedInUsd + +getThePercentageOfTheNumber(
        getTokenPriceInUsd(+amount, priceInUsd),
        collateralFactor,
      ));
      borrowLimitUsedEqualNewSupply = ((currentBorrowLimitUsedInUsd + +getThePercentageOfTheNumber(
        getTokenPriceInUsd(+amount, priceInUsd),
        collateralFactor,
      )) / yourBorrowLimit) * 100;
    } else if (type === TypeEnum.BORROW) {
      borrowLimitUsedEqualNewSupply = ((getTokenPriceInUsd(+amount, priceInUsd) / yourBorrowLimit) * 100) + borrowLimitUsed;
      if (borrowLimitUsedEqualNewSupply >= 80) {
        setError('Beware of the Liquidation Risk');
      } else {
        setError('');
      }
    } else if (type === TypeEnum.REPAY) {
      borrowLimitUsedEqualNewSupply = ((currentBorrowLimitUsedInUsd - (getTokenPriceInUsd(+amount, priceInUsd))) / yourBorrowLimit) * 100;
    }

    setYourBorrowLimitUsedEqualNewSupply(borrowLimitUsedEqualNewSupply);
    setYourTotalBorrowLimit(finalBorrowLimit);
  }, [amount, borrowByCurrentToken, borrowLimitUsed, collateralFactor, isBorrowTheme, priceInUsd, type, yourBorrowLimit, yourTotalBorrowLimit]);

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

      if (newAmount && newAmount.lt(balance)) {
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

  // Form submit
  const onSubmit = useCallback(
    ({ input: inputData }: FormTypes) => {
      const inputError = validateInput(inputData, true);
      if (inputError) {
        return setError(inputError);
      }

      console.log(JSON.stringify(inputData, null, 2));
      return undefined;
    },
    [],
  );

  useEffect(() => {
    switch (type) {
      case TypeEnum.SUPPLY:
        setData({
          text: 'Supply',
          balanceTitle: 'Wallet balance:',
          tokenAmount: getPrettyAmount({
            value: asset.balance,
            currency: getTokenName(asset),
            dec: asset.decimals,
          }),
          balance: asset.balance,
        });
        break;
      case TypeEnum.WITHDRAW: {
        const amountToWithdraw = supplyBalance - ((+getThePercentageOfTheNumber(yourBorrowLimit, borrowLimitUsed) * 100) / collateralFactor);
        const amountInToken = amountToWithdraw / priceInUsd;
        setData({
          text: 'Withdraw',
          balanceTitle: 'Available to withdraw:',
          tokenAmount: getPrettyAmount({
            value: amountInToken,
            currency: getTokenName(asset),
            dec: asset.decimals,
          }),
          balance: amountInToken,
        });
      }
        break;
      case TypeEnum.BORROW: {
        const amountToWithdraw = yourBorrowLimit - +getThePercentageOfTheNumber(yourBorrowLimit, borrowLimitUsed);
        const amountInToken = amountToWithdraw / priceInUsd;
        setData({
          text: 'Borrow',
          balanceTitle: 'Available to borrow:',
          tokenAmount: getPrettyAmount({
            value: amountInToken,
            currency: getTokenName(asset),
            dec: asset.decimals,
          }),
          balance: amountInToken,
        });
      }
        break;
      case TypeEnum.REPAY: {
        const borrrowInToken = borrowByCurrentToken / priceInUsd;
        setData({
          text: 'Repay',
          balanceTitle: 'Available to repay:',
          tokenAmount: getPrettyAmount({
            value: borrrowInToken,
            currency: getTokenName(asset),
            dec: asset.decimals,
          }),
          balance: borrrowInToken,
        });
      }
        break;
      default:
        setData(defaultData);
        break;
    }
  }, [asset, borrowByCurrentToken, borrowLimitUsed, collateralFactor, priceInUsd, supplyBalance, tokenPriceInUsd, type, yourBorrowLimit]);

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
          priceInUsd={priceInUsd}
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

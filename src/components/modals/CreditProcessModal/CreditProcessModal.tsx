/* eslint-disable max-len */
import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { ModalActions } from 'types/modal';
import { TokenMetadataWithBalanceInterface } from 'types/token';
import { getTokenName } from 'utils/getTokenName';
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

import { getThePercentageOfTheNumber } from 'utils/getThePercentageOfTheNumber';
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
  collateralFactor: number
} & Pick<ModalActions, 'isOpen' | 'onRequestClose'>;

type DataType = {
  text: string
  walletText: string
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
  walletText: '',
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
  isOpen,
  onRequestClose,
}) => {
  const [{ text, walletText }, setData] = useState<DataType>(defaultData);
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

  // Subscribe on input
  const { amount } = watch('input');

  // Counting your total borrow limit
  useEffect(() => {
    if (amount) {
      const totalBorrowLimit = getThePercentageOfTheNumber(+amount, collateralFactor) + yourBorrowLimit;
      setYourTotalBorrowLimit(totalBorrowLimit);
    }
  }, [amount, collateralFactor, yourBorrowLimit]);

  // Counting your borrow limit used with new Supply
  useEffect(() => {
    const currentBorrowLimitUsedInUsd = getThePercentageOfTheNumber(yourBorrowLimit, borrowLimitUsed);
    const borrowLimitUsedEqualNewSupply = (currentBorrowLimitUsedInUsd / yourTotalBorrowLimit) * 100;
    setYourBorrowLimitUsedEqualNewSupply(borrowLimitUsedEqualNewSupply);
  }, [borrowLimitUsed, yourBorrowLimit, yourTotalBorrowLimit]);

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

      if (newAmount && newAmount.lte(asset.balance)) {
        const numberByPercent = (+newAmount / asset.balance) * 100;
        setSliderValue(numberByPercent);
        setTooltipOffset(numberByPercent);
      } else if (newAmount?.gt(asset.balance)) {
        setSliderValue(100);
        setTooltipOffset(100);
      } else if (!newAmount) {
        setSliderValue(0);
      }
    }, [asset, setTooltipOffset, setValue],
  );

  // Counting input value relatively input percent
  const setAmountEqualPercent = useCallback(
    (percent: number) => {
      const value = getThePercentageOfTheNumber(asset.balance, percent);
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
    [asset, setValue],
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
          walletText: 'Wallet balance:',
        });
        break;
      case TypeEnum.WITHDRAW:
        setData({
          text: 'Withdraw',
          walletText: 'Supply balance:',
        });
        break;
      case TypeEnum.BORROW:
        setData({
          text: 'Borrow',
          walletText: 'Borrow balance:',
        });
        break;
      case TypeEnum.REPAY:
        setData({
          text: 'Repay',
          walletText: 'Borrow balance:',
        });
        break;
      default:
        setData(defaultData);
        break;
    }
  }, [type]);

  const isBorrowTheme = type === TypeEnum.BORROW || type === TypeEnum.REPAY;

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
          {walletText}

          <div className={s.balance}>
            {getPrettyAmount({ value: asset.balance, currency: getTokenName(asset) })}
          </div>
        </div>

        <NumberInput
          theme={theme}
          input={{ amount: numberInputStringValue, metadata: asset }}
          priceInUsd={priceInUsd}
          handleInputChange={handleInputChange}
          error={error}
          setError={setError}
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
            Your Borrow Limit:
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
          disabled={!!error}
        >
          {text}
        </Button>
      </form>
    </Modal>
  );
};

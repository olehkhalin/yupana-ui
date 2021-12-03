import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { ModalActions } from 'types/modal';
import { TokenMetadataWithBalanceInterface } from 'types/token';
import { getTokenName } from 'utils/getTokenName';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { useWiderThanMphone } from 'utils/getMediaQuery';
import { validateInput } from 'utils/validateInput';
import { Modal } from 'components/ui/Modal';
import { NumberInput } from 'components/common/NumberInput';
import { Button } from 'components/ui/Button';
import { Slider } from 'components/ui/Slider';
import { TokenLogo } from 'components/ui/TokenLogo';

import s from './CreditProcessModal.module.sass';

export enum ThemeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  QUATERNARY = 'quaternary',
}

type CreditProcessModalProps = {
  theme?: ThemeEnum
  asset: TokenMetadataWithBalanceInterface
  walletBalance: number
  yourBorrowLimit: number
  borrowLimitUsed: number
  priceInUsd: number
} & Pick<ModalActions, 'isOpen' | 'onRequestClose'>;

type DataType = {
  text: string
  walletText: string
};

export interface InputInterface {
  metadata?: TokenMetadataWithBalanceInterface
  amount?: BigNumber
}

type FormTypes = {
  input: InputInterface
};

const defaultData = {
  text: '',
  walletText: '',
};

export const CreditProcessModal: React.FC<CreditProcessModalProps> = ({
  theme = ThemeEnum.PRIMARY,
  asset,
  walletBalance,
  yourBorrowLimit,
  borrowLimitUsed,
  priceInUsd,
  isOpen,
  onRequestClose,
}) => {
  const [{ text, walletText }, setData] = useState<DataType>(defaultData);
  const [sliderValue, setSliderValue] = useState<number>(0);
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

  const input = watch('input') ?? {};

  // Input change
  const onAmountChange = useCallback(
    (newAmount?: BigNumber) => {
      setValue('input', {
        amount: newAmount,
        metadata: asset,
      });

      if (newAmount && newAmount.lte(asset.balance)) {
        const numberByPercent = (+newAmount / asset.balance) * 100;
        setSliderValue(numberByPercent);
        if (valueRef && valueRef.current) {
          valueRef.current.style.left = `${numberByPercent / 1.1}%`;
        }
      } else if (newAmount?.gt(asset.balance)) {
        setSliderValue(100);
        if (valueRef && valueRef.current) {
          valueRef.current.style.left = `${100 / 1.1}%`;
        }
      }
    }, [asset, setValue],
  );

  // Counting input value relatively input percent
  const getAmountEqualPercent = useCallback(
    (percent: number) => {
      const value = input.metadata?.balance * (percent / 100);
      setValue('input', {
        amount: new BigNumber(value),
        metadata: asset,
      });
    },
    [asset, input.metadata?.balance, setValue],
  );

  // Slider change
  const handleSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (valueRef && valueRef.current) {
        valueRef.current.style.left = `${(+event.target.value) / 1.1}%`;
      }
      setSliderValue(+event.target.value);
      getAmountEqualPercent(+event.target.value);
      setError('');
    },
    [getAmountEqualPercent],
  );

  // Change slider by percent buttons
  const handlePercent = useCallback(
    (amount: number) => {
      if (valueRef && valueRef.current) {
        valueRef.current.style.left = `${(amount) / 1.1}%`;
      }

      setSliderValue(amount);
      getAmountEqualPercent(amount);
    },
    [getAmountEqualPercent],
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
    switch (theme) {
      case ThemeEnum.PRIMARY:
        setData({
          text: 'Supply',
          walletText: 'Wallet balance:',
        });
        break;
      case ThemeEnum.SECONDARY:
        setData({
          text: 'Withdraw',
          walletText: 'Supply balance:',
        });
        break;
      case ThemeEnum.TERTIARY:
        setData({
          text: 'Borrow',
          walletText: 'Borrow balance:',
        });
        break;
      case ThemeEnum.QUATERNARY:
        setData({
          text: 'Repay',
          walletText: 'Borrow balance:',
        });
        break;
      default:
        setData(defaultData);
        break;
    }
  }, [theme]);

  const getTheme = useCallback(
    () => {
      if (theme === ThemeEnum.PRIMARY || theme === ThemeEnum.SECONDARY) {
        return ThemeEnum.PRIMARY;
      }
      if (theme === ThemeEnum.TERTIARY || theme === ThemeEnum.QUATERNARY) {
        return ThemeEnum.SECONDARY;
      }
      return undefined;
    },
    [theme],
  );

  const isBorrowTheme = theme === ThemeEnum.TERTIARY || theme === ThemeEnum.QUATERNARY;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      innerClassName={s.inner}
      className={cx(s.root, { [s.borrow]: isBorrowTheme })}
    >
      <form
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
            {getPrettyAmount({ value: walletBalance, currency: getTokenName(asset) })}
          </div>
        </div>

        <NumberInput
          theme={getTheme()}
          input={input}
          priceInUsd={priceInUsd}
          onAmountChange={onAmountChange}
          error={error}
          setError={setError}
          className={s.input}
        />

        <Slider
          theme={getTheme()}
          value={sliderValue.toFixed(2)}
          onChange={handleSliderChange}
          handlePercent={handlePercent}
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
            {`
              ${getPrettyAmount({ value: yourBorrowLimit, currency: '$' })} 
              -> 
              ${getPrettyAmount({ value: yourBorrowLimit, currency: '$' })}
            `}
          </div>
        </div>

        <div className={s.borrowLimitUsed}>
          <div className={s.borrowDescription}>
            Borrow Limit Used:
          </div>
          <div className={s.borrowResult}>
            {`
              ${borrowLimitUsed} %
              -> 
              ${borrowLimitUsed} %
            `}
          </div>
        </div>

        <Button
          sizeT={isWiderThanMphone ? 'large' : 'medium'}
          actionT={isBorrowTheme ? 'borrow' : 'supply'}
          type="submit"
          // disabled={!!error}
        >
          {text}
        </Button>
      </form>
    </Modal>
  );
};

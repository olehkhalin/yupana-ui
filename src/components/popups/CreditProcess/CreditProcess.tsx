import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import cx from 'classnames';

import { ModalActions } from 'types/modal';
import { TokenMetadataInterface } from 'types/token';
import { getTokenName } from 'utils/getTokenName';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { useWiderThanMphone } from 'utils/getMediaQuery';
import { Modal } from 'components/ui/Modal';
import { CreditInput } from 'components/ui/CreditInput';
import { Button } from 'components/ui/Button';
import { Slider } from 'components/ui/Slider';
import { TokenLogo } from 'components/ui/TokenLogo';

import s from './CreditProcess.module.sass';

export enum ThemeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  QUATERNARY = 'quaternary',
}

type CreditProcessProps = {
  theme?: ThemeEnum
  asset: TokenMetadataInterface
  walletBalance: number
  yourBorrowLimit: number
  borrowLimitUsed: number
} & Pick<ModalActions, 'isOpen' | 'onRequestClose'>;

type DataType = {
  text: string
  walletText: string
};

const defaultData = {
  text: '',
  walletText: '',
};

export const CreditProcess: React.FC<CreditProcessProps> = ({
  theme = ThemeEnum.TERTIARY,
  asset,
  walletBalance,
  yourBorrowLimit,
  borrowLimitUsed,
  isOpen,
  onRequestClose,
}) => {
  const [{ text, walletText }, setData] = useState<DataType>(defaultData);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const valueRef = useRef<HTMLDivElement | null>(null);
  const isWiderThanMphone = useWiderThanMphone();

  const isBorrowTheme = theme === ThemeEnum.TERTIARY || theme === ThemeEnum.QUATERNARY;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (valueRef && valueRef.current) {
      valueRef.current.style.left = `${+event.target.value / 1.1}%`;
    }
  };

  const handleSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSliderValue(+event.target.value);
    },
    [],
  );

  const handlePercent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, amount: number) => {
      if (valueRef && valueRef.current) {
        valueRef.current.style.left = `${(+event.target.value + amount) / 1.1}%`;
      }
      setSliderValue(amount);
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      innerClassName={s.inner}
      className={cx(s.root, { [s.borrow]: isBorrowTheme })}
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

      <CreditInput
        theme={getTheme()}
        className={s.input}
      />

      <Slider
        theme={getTheme()}
        value={sliderValue}
        onChange={handleSliderChange}
        handlePercent={handlePercent}
        valueRef={valueRef}
        onInput={handleChange}
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
      >
        {text}
      </Button>
    </Modal>
  );
};

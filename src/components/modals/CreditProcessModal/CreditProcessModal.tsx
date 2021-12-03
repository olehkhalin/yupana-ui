import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import cx from 'classnames';

import { ModalActions } from 'types/modal';
import { TokenMetadataInterface } from 'types/token';
import { getTokenName } from 'utils/getTokenName';
import { getPrettyPercent } from 'utils/getPrettyPercent';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { useWiderThanMphone } from 'utils/getMediaQuery';
import { Modal } from 'components/ui/Modal';
import { CreditInput } from 'components/ui/CreditInput';
import { Button } from 'components/ui/Button';
import { Slider } from 'components/ui/Slider';
import { TokenLogo } from 'components/ui/TokenLogo';

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

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const CreditProcessModal: React.FC<CreditProcessModalProps> = ({
  type = TypeEnum.SUPPLY,
  theme = 'primary',
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

  const isBorrowTheme = type === TypeEnum.BORROW || type === TypeEnum.REPAY;

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
      setSliderValue((+event.target.value + amount));
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      innerClassName={s.inner}
      theme={theme}
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
        theme={theme}
        className={s.input}
      />

      <Slider
        theme={theme}
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
          {getPrettyAmount({ value: yourBorrowLimit, currency: '$' })}
          {'->'}
          {getPrettyAmount({ value: yourBorrowLimit, currency: '$' })}
        </div>
      </div>

      <div className={s.borrowLimitUsed}>
        <div className={s.borrowDescription}>
          Borrow Limit Used:
        </div>
        <div className={s.borrowResult}>
          {getPrettyPercent(borrowLimitUsed)}
          {'->'}
          {getPrettyPercent(borrowLimitUsed)}
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

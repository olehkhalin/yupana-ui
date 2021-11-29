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

type CreditProcessProps = {
  theme?: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
  asset: TokenMetadataInterface
  walletBalance: number
  yourBorrowLimit: number
  borrowLimitUsed: number
} & Pick<ModalActions, 'isOpen' | 'onRequestClose'>;

export const CreditProcess: React.FC<CreditProcessProps> = ({
  theme = 'primary',
  asset,
  walletBalance,
  yourBorrowLimit,
  borrowLimitUsed,
  isOpen,
  onRequestClose,
}) => {
  const isWiderThanMphone = useWiderThanMphone();
  const [sliderValue, setSliderValue] = useState(0);
  const [state, setState] = useState({
    text: '',
    walletText: '',
  });
  const valueRef: any = useRef();
  const yellowTheme = theme === 'tertiary' || theme === 'quaternary';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    valueRef.current.style.left = `${+event.target.value / 1.1}%`;
  };

  const handleSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSliderValue(+event.target.value);
    },
    [],
  );

  const handlePercent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, amount: number) => {
      valueRef.current.style.left = `${+event.target.value + amount - (amount / 100) * 5}%`;
      setSliderValue(amount);
    },
    [],
  );

  useEffect(() => {
    switch (theme) {
      case 'primary':
        setState({
          text: 'Supply',
          walletText: 'Wallet balance:',
        });
        break;
      case 'secondary':
        setState({
          text: 'Withdraw',
          walletText: 'Wallet balance:',
        });
        break;
      case 'tertiary':
        setState({
          text: 'Borrow',
          walletText: 'Borrow balance:',
        });
        break;
      case 'quaternary':
        setState({
          text: 'Repay',
          walletText: 'Borrow balance:',
        });
        break;
      default:
        setState({
          text: 'Supply',
          walletText: 'wallet balance:',
        });
        break;
    }
  }, [theme]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      innerClassName={s.inner}
    >
      <div className={s.root}>
        <h2 className={s.title}>
          {state.text}
        </h2>

        <div className={s.tokenInfo}>
          <TokenLogo
            sizeT="large"
            logo={{ name: getTokenName(asset), thumbnailUri: asset.thumbnailUri }}
            className={s.icon}
          />
          {getTokenName(asset, true)}
        </div>

        <div className={s.walletBalance}>
          <div className={s.wBalance}>
            {state.walletText}
          </div>

          <div className={s.balance}>
            {getPrettyAmount({ value: walletBalance, currency: getTokenName(asset) })}
          </div>
        </div>

        <CreditInput
          className={cx(s.input, s.supply, { [s.borrow]: yellowTheme })}
        />

        <Slider
          value={sliderValue}
          onChange={handleSliderChange}
          handlePercent={handlePercent}
          sliderClassName={cx(s.supply, { [s.borrow]: yellowTheme })}
          valueRef={valueRef}
          onInput={handleChange}
          // className={s.supply}
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
          actionT={yellowTheme ? 'borrow' : 'supply'}
        >
          {state.text}
        </Button>
      </div>
    </Modal>
  );
};

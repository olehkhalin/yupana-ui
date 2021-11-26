/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';

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
  asset: TokenMetadataInterface
  walletBalance: number
  yourBorrowLimit: number
  borrowLimitUsed: number
  isOpen: boolean,
  onRequestClose: () => void,
};

export const CreditProcess: React.FC<CreditProcessProps> = ({
  asset,
  walletBalance,
  yourBorrowLimit,
  borrowLimitUsed,
  isOpen,
  onRequestClose,
}) => {
  const isWiderThanMphone = useWiderThanMphone();
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSliderValue(+event.target.value);
    },
    [],
  );

  const handlePercent = useCallback(
    (amount: number) => {
      setSliderValue(amount);
    },
    [],
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      innerClassName={s.inner}
    >
      <div className={s.root}>
        <h2 className={s.title}>
          Borrow
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
            Borrow Balance:
          </div>

          <div className={s.balance}>
            {getPrettyAmount({ value: walletBalance, currency: getTokenName(asset) })}
          </div>
        </div>

        <CreditInput
          className={s.input}
        />

        <Slider
          value={sliderValue}
          onChange={handleSliderChange}
          handlePercent={handlePercent}
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
        >
          Borrow
        </Button>
      </div>
    </Modal>
  );
};

/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { Modal } from 'components/ui/Modal';
import { CreditInput } from 'components/ui/CreditInput';
import { Button } from 'components/ui/Button';
import { ReactComponent as TokenImage } from 'svg/CreditToken.svg';

import s from './CreditProcess.module.sass';

type CreditProcessProps = {
  title: string
  symbol: string,
  name: string,
  balance: string,
  buttonText: string,
  isOpen: boolean,
  onRequestClose: () => void,
};

export const CreditProcess: React.FC<CreditProcessProps> = ({
  title,
  symbol,
  name,
  balance,
  buttonText,
  isOpen,
  onRequestClose,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    innerClassName={s.inner}
  >
    <div className={s.root}>
      <h2 className={s.title}>
        {title}
      </h2>
      <div className={s.tokenInfo}>
        <TokenImage className={s.icon} />
        {symbol}
        {' / '}
        {name}
      </div>
      <div className={s.walletBalance}>
        <div className={s.wBalance}>
          Wallet Balance:
        </div>
        <div className={s.balance}>
          {balance}
          {' '}
          {symbol}
          {' '}
        </div>
      </div>
      <div className={s.input}>
        <CreditInput />
      </div>
      <input
        type="range"
        step="1"
        // min="0"
        // max="100"
        defaultValue="0"
        className={s.slider}
      />
      <div className={s.percents}>
        <div className={s.percent}>0%</div>
        <div className={s.percent}>25%</div>
        <div className={s.percent}>50%</div>
        <div className={s.percent}>75%</div>
        <div className={s.percent}>100%</div>
      </div>
      <h2 className={s.borrowTitle}>
        Borrow limit
      </h2>
      <div className={s.borrowLimit}>
        <div className={s.borrowDescription}>
          Your Borrow Limit:
        </div>
        <div className={s.borrowResult}>
          { '$ 00.00 -> $ 34,425.30'}
        </div>
      </div>
      <div className={s.borrowLimitUsed}>
        <div className={s.borrowDescription}>
          Borrow Limit Used:
        </div>
        <div className={s.borrowResult}>
          { '0.00 % -> 0.00 %'}
        </div>
      </div>
      <Button
        sizeT="small"
      >
        {buttonText}
      </Button>
    </div>
  </Modal>
);

import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import { useWiderThanMphone } from 'utils/getMediaQuery';
import { Button } from 'components/ui/Button';
import { useCurrency } from 'providers/CurrencyProvider';

import s from './CurrencySwitcher.module.sass';

type CurrencySwitcherProps = {
  className?: string
};

export enum CurrencyEnum {
  XTZ = 'xtz',
  USD = 'usd',
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({
  className,
}) => {
  const { currency, setCurrency } = useCurrency();
  const [switcherState, setSwitcherState] = useState<CurrencyEnum>();
  const isWiderThanMphone = useWiderThanMphone();

  useEffect(() => {
    setSwitcherState(currency);
  }, [currency]);

  const handleSwitchCurrency = (value: CurrencyEnum) => {
    if (value) {
      setSwitcherState(value);
      setCurrency(value);
      localStorage.setItem('currency', value);
    }
  };

  const handleSwitchCurrencyMobile = (arg: boolean) => {
    if (arg) {
      setSwitcherState(CurrencyEnum.XTZ);
      setCurrency(CurrencyEnum.XTZ);
      localStorage.setItem('currency', CurrencyEnum.XTZ);
    } else {
      setSwitcherState(CurrencyEnum.USD);
      setCurrency(CurrencyEnum.USD);
      localStorage.setItem('currency', CurrencyEnum.USD);
    }
  };

  if (isWiderThanMphone) {
    return (
      <div className={cx(s.root, className)}>
        <Button
          sizeT="small"
          theme="clear"
          onClick={() => handleSwitchCurrency(CurrencyEnum.XTZ)}
          className={cx(s.button, { [s.active]: switcherState === CurrencyEnum.XTZ })}
        >
          {CurrencyEnum.XTZ}
        </Button>
        <span className={s.separator} />
        <Button
          sizeT="small"
          theme="clear"
          onClick={() => handleSwitchCurrency(CurrencyEnum.USD)}
          className={cx(s.button, { [s.active]: switcherState === CurrencyEnum.USD })}
        >
          {CurrencyEnum.USD}
        </Button>
      </div>
    );
  }

  return (
    <Button
      sizeT="small"
      theme="clear"
      onClick={() => handleSwitchCurrencyMobile(switcherState === CurrencyEnum.USD)}
      className={cx(s.root, className)}
    >
      <div className={cx(s.currency, { [s.active]: switcherState === CurrencyEnum.USD })}>
        <div className={cx(s.item, { [s.active]: switcherState === CurrencyEnum.XTZ })}>
          {CurrencyEnum.XTZ}
        </div>
        <div className={cx(s.item, { [s.active]: switcherState === CurrencyEnum.USD })}>
          {CurrencyEnum.USD}
        </div>
      </div>
    </Button>
  );
};

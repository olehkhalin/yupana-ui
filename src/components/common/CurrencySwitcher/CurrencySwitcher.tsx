import React from 'react';
import cx from 'classnames';

import { CurrencyEnum, useCurrency } from 'providers/CurrencyProvider';
import { useWiderThanMphone } from 'utils/getMediaQuery';
import { Button } from 'components/ui/Button';

import s from './CurrencySwitcher.module.sass';

type CurrencySwitcherProps = {
  className?: string
};

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({
  className,
}) => {
  const { currency, setCurrency } = useCurrency();
  const isWiderThanMphone = useWiderThanMphone();

  const handleSwitchCurrency = (value: CurrencyEnum) => {
    setCurrency(value);
  };

  const handleSwitchCurrencyMobile = (arg: boolean) => {
    if (arg) {
      setCurrency(CurrencyEnum.XTZ);
    } else {
      setCurrency(CurrencyEnum.USD);
    }
  };

  if (isWiderThanMphone) {
    return (
      <div className={cx(s.root, className)}>
        <Button
          sizeT="small"
          theme="clear"
          onClick={() => handleSwitchCurrency(CurrencyEnum.XTZ)}
          className={cx(s.button, { [s.active]: currency === CurrencyEnum.XTZ })}
        >
          {CurrencyEnum.XTZ}
        </Button>
        <span className={s.separator} />
        <Button
          sizeT="small"
          theme="clear"
          onClick={() => handleSwitchCurrency(CurrencyEnum.USD)}
          className={cx(s.button, { [s.active]: currency === CurrencyEnum.USD })}
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
      onClick={() => handleSwitchCurrencyMobile(currency === CurrencyEnum.USD)}
      className={cx(s.root, className)}
    >
      <div className={cx(s.currency, { [s.active]: currency === CurrencyEnum.USD })}>
        <div className={cx(s.item, { [s.active]: currency === CurrencyEnum.XTZ })}>
          {CurrencyEnum.XTZ}
        </div>
        <div className={cx(s.item, { [s.active]: currency === CurrencyEnum.USD })}>
          {CurrencyEnum.USD}
        </div>
      </div>
    </Button>
  );
};

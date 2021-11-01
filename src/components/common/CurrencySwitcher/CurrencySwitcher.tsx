import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';

import s from './CurrencySwitcher.module.sass';

type CurrencySwitcherProps = {
  className?: string
};

enum CurrencyEnum {
  XTZ = 'xtz',
  USD = 'usd',
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({
  className,
}) => {
  const [active, setActive] = useState<CurrencyEnum>();

  const handleSwitchCurrency = (currency: CurrencyEnum) => {
    setActive(currency);
    localStorage.setItem('currency', currency);
  };

  const handleSwitchCurrencyMobile = (arg: boolean) => {
    if (arg) {
      setActive(CurrencyEnum.XTZ);
      localStorage.setItem('currency', CurrencyEnum.XTZ);
    } else {
      setActive(CurrencyEnum.USD);
      localStorage.setItem('currency', CurrencyEnum.USD);
    }
  };

  useEffect(() => {
    const currency: CurrencyEnum | null = localStorage.getItem('currency') as CurrencyEnum | null;
    if (currency) {
      setActive(currency);
    } else {
      setActive(CurrencyEnum.XTZ);
    }
  }, []);

  const compoundClassNames = cx(
    s.root,
    s.desktop,
    className,
  );

  return (
    <>
      <div className={compoundClassNames}>
        <Button
          sizeT="small"
          theme="clear"
          onClick={() => handleSwitchCurrency(CurrencyEnum.XTZ)}
          className={cx(s.button, { [s.active]: active === CurrencyEnum.XTZ })}
        >
          {CurrencyEnum.XTZ}
        </Button>
        <span className={s.separator} />
        <Button
          sizeT="small"
          theme="clear"
          onClick={() => handleSwitchCurrency(CurrencyEnum.USD)}
          className={cx(s.button, { [s.active]: active === CurrencyEnum.USD })}
        >
          {CurrencyEnum.USD}
        </Button>
      </div>

      <Button
        sizeT="small"
        theme="clear"
        onClick={() => handleSwitchCurrencyMobile(active === CurrencyEnum.USD)}
        className={cx(s.root, s.mobile, className)}
      >
        <div className={cx(s.currency, { [s.active]: active === CurrencyEnum.USD })}>
          <div className={cx(s.xtz, { [s.active]: active === CurrencyEnum.XTZ })}>
            {CurrencyEnum.XTZ}
          </div>
          <div className={cx(s.usd, { [s.active]: active === CurrencyEnum.USD })}>
            {CurrencyEnum.USD}
          </div>
        </div>
      </Button>
    </>
  );
};

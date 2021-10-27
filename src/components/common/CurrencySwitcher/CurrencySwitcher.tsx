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
    className,
  );

  return (
    <div className={compoundClassNames}>
      <Button
        sizeT="small"
        theme="clear"
        onClick={() => handleSwitchCurrency(CurrencyEnum.XTZ)}
        className={cx(s.button, { [s.xtz]: active === CurrencyEnum.XTZ })}
      >
        {CurrencyEnum.XTZ}
      </Button>
      <span className={s.separator} />
      <Button
        sizeT="small"
        theme="clear"
        onClick={() => handleSwitchCurrency(CurrencyEnum.USD)}
        className={cx(s.button, { [s.usd]: active === CurrencyEnum.USD })}
      >
        {CurrencyEnum.USD}
      </Button>
    </div>
  );
};

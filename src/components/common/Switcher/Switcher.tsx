import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import s from './Switcher.module.sass';

type SwitcherProps = {
  className?: string
};

enum SwitcherEnum {
  ON = 'on',
  OFF = 'off',
}

export const Switcher: React.FC<SwitcherProps> = ({
  className,
}) => {
  const [active, setActive] = useState<SwitcherEnum>();

  const handleChange = () => {
    if (active === SwitcherEnum.ON) {
      localStorage.setItem('collateral', JSON.stringify(SwitcherEnum.OFF));
      setActive(SwitcherEnum.OFF);
    } else {
      localStorage.setItem('collateral', JSON.stringify(SwitcherEnum.ON));
      setActive(SwitcherEnum.ON);
    }
  };

  useEffect(() => {
    const collateral: SwitcherEnum | null = JSON.parse(localStorage.getItem('collateral') as string) as SwitcherEnum | null;
    if (collateral !== null) {
      setActive(collateral);
    }
  }, []);

  const compoundClassName = cx(
    s.root,
    { [s.off]: active === SwitcherEnum.OFF },
    { [s.on]: active === SwitcherEnum.ON },
    className,
  );

  return (
    <div
      onClick={handleChange}
      className={compoundClassName}
    />
  );
};

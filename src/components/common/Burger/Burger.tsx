import React from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';

import s from './Burger.module.sass';

type BurgerProps = {
  opened: boolean
  handleSwitchDropdown: () => void
  className?: string
};

export const Burger: React.FC<BurgerProps> = ({
  opened,
  handleSwitchDropdown,
  className,
}) => {
  const compoundClassName = cx(s.root, { [s.active]: opened }, className);

  return (
    <Button
      sizeT="small"
      theme="clear"
      className={compoundClassName}
      onClick={handleSwitchDropdown}
    >
      <span className={s.item} />
      <span className={s.item} />
      <span className={s.item} />
    </Button>
  );
};

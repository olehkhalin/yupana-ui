import React from 'react';
import cx from 'classnames';

import { Button } from 'components/ui/Button';
import { ReactComponent as Arrow } from 'svg/DropdownArrow.svg';

import s from './DropdownArrow.module.sass';

type DropdownArrowProps = {
  active?: boolean
  theme?: keyof typeof themeClasses
  className?: string
};

const themeClasses = {
  supply: s.supply,
  borrow: s.borrow,
};

export const DropdownArrow: React.FC<DropdownArrowProps> = ({
  active,
  theme = 'supply',
  className,
  ...props
}) => {
  const compoundClassNames = cx(
    s.root,
    themeClasses[theme],
    { [s.active]: active },
    className,
  );

  return (
    <Button
      theme="clear"
      className={compoundClassNames}
      {...props}
    >
      <Arrow className={s.arrow} />
    </Button>
  );
};

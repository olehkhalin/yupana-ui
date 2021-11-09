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
  primary: s.primary,
  secondary: s.secondary,
};

export const DropdownArrow: React.FC<DropdownArrowProps> = ({
  active,
  theme = 'primary',
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

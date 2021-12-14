import React from 'react';
import cx from 'classnames';

import { Button, HTMLButtonType } from 'components/ui/Button';
import { ReactComponent as Arrow } from 'svg/DropdownArrow.svg';

import s from './DropdownArrow.module.sass';

type DropdownArrowProps = {
  active?: boolean
  theme?: keyof typeof themeClasses
  loading?: boolean
  onClick?: () => void
  className?: string
} & HTMLButtonType;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const DropdownArrow: React.FC<DropdownArrowProps> = ({
  active,
  theme = 'primary',
  loading,
  onClick,
  className,
  ...props
}) => {
  console.log(loading);
  const compoundClassNames = cx(
    s.root,
    themeClasses[theme],
    { [s.active]: active },
    { [s.loading]: loading },
    className,
  );

  return (
    <Button
      theme="clear"
      sizeT="small"
      onClick={onClick}
      className={compoundClassNames}
      {...props}
    >
      <Arrow className={s.arrow} />
    </Button>
  );
};

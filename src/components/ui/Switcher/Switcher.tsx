import React from 'react';
import cx from 'classnames';

import s from './Switcher.module.sass';

type SwitcherProps = {
  active: boolean
  handleChange: () => void
  className?: string
};

export const Switcher: React.FC<SwitcherProps> = ({
  active,
  handleChange,
  className,
}) => {
  const compoundClassName = cx(
    s.root,
    { [s.active]: active },
    className,
  );

  return (
    <div
      onClick={handleChange}
      className={compoundClassName}
    />
  );
};

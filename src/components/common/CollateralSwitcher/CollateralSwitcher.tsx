import React, { useCallback } from 'react';
import cx from 'classnames';

import { Switcher } from 'components/ui/Switcher';

type SwitcherProps = {
  yToken: number
  isCollateral: boolean
  className?: string
};

export const CollateralSwitcher: React.FC<SwitcherProps> = ({
  yToken,
  isCollateral,
  className,
}) => {
  const handleChange = useCallback(async () => {
    console.log('isCollateral', isCollateral, yToken);
  }, [isCollateral, yToken]);

  return (
    <Switcher
      active={isCollateral}
      handleChange={handleChange}
      className={cx(className)}
    />
  );
};

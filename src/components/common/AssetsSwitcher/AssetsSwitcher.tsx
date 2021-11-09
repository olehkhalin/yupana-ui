import React from 'react';
import cx from 'classnames';

import s from './AssetsSwitcher.module.sass';

type AssetsSwitcherProps = {
  active: boolean
  setActive: (arg: boolean) => void
  className?: string
};

export const AssetsSwitcher: React.FC<AssetsSwitcherProps> = ({
  active,
  setActive,
  className,
}) => {
  const handleSwitchAssets = (arg: boolean): void => {
    setActive(arg);
  };

  return (
    <div className={cx(s.root, { [s.active]: !active }, className)}>
      <button
        type="button"
        onClick={() => handleSwitchAssets(true)}
        className={cx(s.button, s.supply, { [s.active]: active })}
      >
        Supply assets
      </button>
      <button
        type="button"
        onClick={() => handleSwitchAssets(false)}
        className={cx(s.button, s.borrow, { [s.active]: !active })}
      >
        Borrow assets
      </button>
    </div>
  );
};
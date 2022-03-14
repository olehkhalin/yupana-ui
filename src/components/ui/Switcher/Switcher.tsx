import React, { FC } from "react";
import cx from "classnames";

import { PendingIcon } from "components/common/PendingIcon";

import s from "./Switcher.module.sass";

type SwitcherProps = {
  active: boolean;
  handleChange: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export const Switcher: FC<SwitcherProps> = ({
  active,
  handleChange,
  disabled,
  loading,
  className,
}) => {
  const compoundClassName = cx(
    s.button,
    { [s.active]: active },
    { [s.disabled]: disabled },
    { [s.loading]: loading },
    className
  );

  return (
    <div className={s.root}>
      <button
        type="button"
        onClick={handleChange}
        disabled={disabled}
        className={compoundClassName}
      ></button>
      {loading && <PendingIcon isTransparent className={s.pendingIcon} />}
    </div>
  );
};

import React from "react";
import cx from "classnames";

import s from "./Switcher.module.sass";

type SwitcherProps = {
  active: boolean;
  handleChange: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  className?: string;
};

export const Switcher: React.FC<SwitcherProps> = ({
  active,
  handleChange,
  disabled,
  className,
}) => {
  const compoundClassName = cx(
    s.root,
    { [s.active]: active },
    { [s.disabled]: disabled },
    className
  );

  return (
    <button
      type="button"
      onClick={handleChange}
      className={compoundClassName}
    />
  );
};

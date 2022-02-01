import React from "react";

import { Switcher } from "components/ui/Switcher";

type SwitcherProps = {
  yToken: number;
  isCollateral: boolean;
  className?: string;
};

export const CollateralSwitcher: React.FC<SwitcherProps> = ({
  yToken,
  isCollateral,
  className,
}) => {
  const disabled = false;
  const handleChange = () => console.log("handleChange");

  return (
    <Switcher
      active={isCollateral}
      handleChange={handleChange}
      disabled={disabled}
      className={className}
    />
  );
};

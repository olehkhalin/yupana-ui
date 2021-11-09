import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import { TokenId } from 'types/token';
import { getTokenSlug } from 'utils/getTokenSlug';
import { Switcher } from 'components/ui/Switcher';

type SwitcherProps = {
  token: TokenId
  className?: string
};

export const CollateralSwitcher: React.FC<SwitcherProps> = ({
  token,
  className,
}) => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const collateral: string[] | null = JSON.parse(localStorage.getItem('collateral') as string) as string[] | null;
    if (collateral && collateral.length) {
      const currentToken = collateral.find((item) => item === getTokenSlug(token));
      if (currentToken) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  }, [token]);

  const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
    e?.stopPropagation();
    const collateral: string[] | null = JSON.parse(localStorage.getItem('collateral') as string) as string[] | null;
    if (collateral && collateral.length) {
      const currentToken = collateral.find((item) => item === getTokenSlug(token));
      if (active && currentToken) {
        const tokensWithoutCurrent = collateral.filter((item) => item !== currentToken);
        localStorage.setItem('collateral', JSON.stringify(tokensWithoutCurrent));
        setActive(false);
      } else {
        localStorage.setItem('collateral', JSON.stringify([...collateral, getTokenSlug(token)]));
        setActive(true);
      }
    } else {
      localStorage.setItem('collateral', JSON.stringify([getTokenSlug(token)]));
      setActive(true);
    }
  };

  return (
    <Switcher
      active={active}
      handleChange={handleChange}
      className={cx(className)}
    />
  );
};

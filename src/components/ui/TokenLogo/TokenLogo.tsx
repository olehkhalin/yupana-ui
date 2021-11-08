import React from 'react';
import cx from 'classnames';

import { TokenLogoInterface } from 'types/token';
import FallbackLogo from 'svg/FallbackLogo.svg';

import s from './TokenLogo.module.sass';

type TokenLogoProps = {
  logo: TokenLogoInterface
  sizeT?: keyof typeof sizeClass
  className?: string
};

const sizeClass = {
  small: s.small,
  large: s.large,
};

export const TokenLogo: React.FC<TokenLogoProps> = ({
  logo,
  sizeT = 'small',
  className,
}) => {
  const compoundClassName = cx(
    s.root,
    sizeClass[sizeT],
    className,
  );

  return (
    <>
      {logo.thumbnailUri ? (
        <img
          src={logo.thumbnailUri}
          alt={logo.name ?? 'Symbol'}
          className={compoundClassName}
        />
      ) : (
        <img
          src={FallbackLogo}
          alt={logo.name ?? 'Logo'}
          className={compoundClassName}
        />
      )}
    </>
  );
};

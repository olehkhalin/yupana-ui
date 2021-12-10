import React from 'react';
import cx from 'classnames';

import { TokenLogoInterface } from 'types/token';
import FallbackLogo from 'svg/FallbackLogo.svg';

import s from './TokenLogo.module.sass';

type TokenLogoProps = {
  theme?: keyof typeof themeClasses
  logo: TokenLogoInterface
  sizeT?: keyof typeof sizeClass
  loading?: boolean
  className?: string
};

const sizeClass = {
  small: s.small,
  large: s.large,
};

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const TokenLogo: React.FC<TokenLogoProps> = ({
  theme,
  logo,
  sizeT = 'small',
  loading,
  className,
}) => {
  const compoundClassName = cx(
    s.root,
    sizeClass[sizeT],
    className,
  );

  return (
    <>
      {loading && theme ? (
        <div className={cx(compoundClassName, themeClasses[theme])} />
      ) : (
        <img
          src={logo.thumbnailUri ? logo.thumbnailUri : FallbackLogo}
          alt={logo.name ?? 'Symbol'}
          className={compoundClassName}
        />
      )}
    </>
  );
};

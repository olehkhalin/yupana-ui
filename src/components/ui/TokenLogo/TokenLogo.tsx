import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import { TokenLogoInterface } from 'types/token';
import { PreloaderLogo } from 'components/ui/Preloader';
import FallbackLogo from 'svg/FallbackLogo.svg';

import s from './TokenLogo.module.sass';

type TokenLogoProps = {
  theme?: 'primary' | 'secondary'
  logo: TokenLogoInterface
  sizeT?: keyof typeof sizeClass
  // loading?: boolean
  className?: string
};

const sizeClass = {
  small: s.small,
  large: s.large,
};

export const TokenLogo: React.FC<TokenLogoProps> = ({
  theme,
  logo,
  sizeT = 'small',
  // loading,
  className,
}) => {
  const compoundClassName = cx(
    s.root,
    sizeClass[sizeT],
    className,
  );

  const [state, setState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setState(true);
    }, 2000);
  });

  return (
    <>
      {!state ? <PreloaderLogo theme={theme} className={compoundClassName} /> : (
        <>
          <img
            src={logo.thumbnailUri ? logo.thumbnailUri : FallbackLogo}
            alt={logo.name ?? 'Symbol'}
            className={compoundClassName}
          />
        </>
      )}
      {/* {logo.thumbnailUri ? (
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
      )} */}
    </>
  );
};

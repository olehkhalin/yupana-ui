/* eslint-disable no-nested-ternary */
import React from 'react';
import cx from 'classnames';

import { TokenLogoInterface, TokenTypeInteface } from 'types/token';
import { getSlice } from 'utils/getSlice';
import { TokenLogo } from 'components/ui/TokenLogo';
import { Button } from 'components/ui/Button';
import { SliceTooltip } from 'components/common/SliceTooltip';

import s from './TokenName.module.sass';

type AssetNameProps = {
  token: TokenTypeInteface
  className?: string
};

type WrapperProps = {
  logo: TokenLogoInterface
  className?: string
};

const Wrapper: React.FC<WrapperProps> = ({
  logo,
  className,
  children,
}) => (
  <Button
    theme="clear"
    sizeT="small"
    className={cx(s.root, className)}
  >
    <TokenLogo
      logo={{ ...logo }}
      className={s.logo}
    />
    {children}
  </Button>
);

export const TokenName: React.FC<AssetNameProps> = ({
  token,
  className,
}) => {
  const metadata = {
    name: (token.name ?? token.symbol) || 'Token',
    isSlice: token.name ? token.name.length > 11 : token.symbol ? token.symbol.length > 11 : false,
  };

  if (metadata.isSlice) {
    return (
      <SliceTooltip text={metadata.name}>
        <Wrapper
          logo={{ name: metadata.name, thumbnailUri: token.thumbnailUri }}
          className={className}
        >
          {getSlice(metadata.name, 5)}
        </Wrapper>
      </SliceTooltip>
    );
  }

  return (
    <Wrapper
      logo={{ name: metadata.name, thumbnailUri: token.thumbnailUri }}
      className={className}
    >
      {metadata.name}
    </Wrapper>
  );
};

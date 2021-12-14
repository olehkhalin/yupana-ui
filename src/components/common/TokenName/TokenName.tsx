/* eslint-disable no-nested-ternary */
import React from 'react';
import cx from 'classnames';

import { TokenMetadataInterface } from 'types/token';
import { getTokenName } from 'utils/getTokenName';
import { getSlice } from 'utils/getSlice';
import { TokenLogo, TokenLogoThemes } from 'components/ui/TokenLogo';
import { Button } from 'components/ui/Button';
import { Tooltip } from 'components/ui/Tooltip';

import s from './TokenName.module.sass';

type AssetNameProps = {
  theme?: TokenLogoThemes
  token: TokenMetadataInterface
  href?: string
  external?: boolean
  logoClassName?: string
  active?: boolean
  loading?: boolean
  className?: string
};

export const TokenName: React.FC<AssetNameProps> = ({
  theme,
  token,
  active = false,
  logoClassName,
  loading,
  className,
  ...props
}) => {
  const tokenName = loading ? '—' : getTokenName(token);
  const metadata = {
    name: getSlice(tokenName, 5),
    isSlice: tokenName ? tokenName.length > 8 : token.symbol ? token.symbol.length > 8 : false,
  };

  const content = (
    <>
      <TokenLogo
        theme={theme}
        logo={{ name: tokenName, thumbnailUri: token.thumbnailUri }}
        loading={loading}
        className={cx(s.logo, logoClassName)}
      />
      {metadata.name}
    </>
  );

  const compoundClassNames = cx(
    s.root,
    { [s.active]: active },
    { [s.loading]: loading },
    className,
  );

  return (
    <Button
      theme="clear"
      sizeT="small"
      className={compoundClassNames}
      disabled={loading}
      {...props}
    >
      {
        metadata.isSlice
          ? (
            <Tooltip
              content={tokenName}
            >
              {content}
            </Tooltip>
          )
          : content
      }
    </Button>
  );
};

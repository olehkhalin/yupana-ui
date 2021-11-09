/* eslint-disable no-nested-ternary */
import React from 'react';
import cx from 'classnames';

import { TokenMetadataInterface } from 'types/token';
import { getTokenName } from 'utils/getTokenName';
import { getSlice } from 'utils/getSlice';
import { TokenLogo } from 'components/ui/TokenLogo';
import { Button } from 'components/ui/Button';
import { Tooltip } from 'components/ui/Tooltip';

import s from './TokenName.module.sass';

type AssetNameProps = {
  token: TokenMetadataInterface
  logoClassName?: string
  className?: string
};

export const TokenName: React.FC<AssetNameProps> = ({
  token,
  logoClassName,
  className,
  ...props
}) => {
  const tokenName = getTokenName(token);
  const metadata = {
    name: getSlice(tokenName, 5),
    isSlice: tokenName ? tokenName.length > 8 : token.symbol ? token.symbol.length > 8 : false,
  };

  const content = (
    <>
      <TokenLogo
        logo={{ name: tokenName, thumbnailUri: token.thumbnailUri }}
        className={cx(s.logo, logoClassName)}
      />
      {metadata.name}
    </>
  );

  return (
    <Button
      theme="clear"
      sizeT="small"
      className={cx(s.wrapper, className)}
      {...props}
    >
      {
        metadata.isSlice
          ? (
            <Tooltip
              content={tokenName}
            >
              <div className={s.wrapper}>
                {content}
              </div>
            </Tooltip>
          )
          : content
      }
    </Button>
  );
};

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
  className?: string
};

export const TokenName: React.FC<AssetNameProps> = ({
  token,
  className,
}) => {
  const tokenName = getTokenName(token);
  const metadata = {
    name: getSlice(tokenName, 5),
    isSlice: tokenName ? tokenName.length > 8 : token.symbol ? token.symbol.length > 8 : false,
  };

  if (metadata.isSlice) {
    return (
      <Button
        theme="clear"
        sizeT="small"
        className={cx(s.root, className)}
      >
        <Tooltip
          content={tokenName}
        >
          <div className={s.wrapper}>
            <TokenLogo
              logo={{ name: tokenName, thumbnailUri: token.thumbnailUri }}
              className={s.logo}
            />
            {metadata.name}
          </div>
        </Tooltip>
      </Button>
    );
  }

  return (
    <Button
      theme="clear"
      sizeT="small"
      className={cx(s.wrapper, className)}
    >
      <TokenLogo
        logo={{ name: metadata.name, thumbnailUri: token.thumbnailUri }}
        className={s.logo}
      />
      {metadata.name}
    </Button>
  );
};

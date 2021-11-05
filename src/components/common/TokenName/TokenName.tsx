/* eslint-disable no-nested-ternary */
import React from 'react';
import cx from 'classnames';

import { TokenTypeInteface } from 'types/token';
import { getSlice } from 'utils/getSlice';
import { TokenLogo } from 'components/ui/TokenLogo';
import { Button } from 'components/ui/Button';
import { SliceTooltip } from 'components/common/SliceTooltip';

import s from './TokenName.module.sass';

type AssetNameProps = {
  token: TokenTypeInteface
  className?: string
};

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
      <Button
        theme="clear"
        sizeT="small"
        className={cx(s.root, className)}
      >
        <SliceTooltip
          text={metadata.name}
        >
          <>
            <TokenLogo
              logo={{ name: metadata.name, thumbnailUri: token.thumbnailUri }}
              className={s.logo}
            />
            <span className={s.name}>
              {getSlice(metadata.name, 5)}
            </span>
          </>
        </SliceTooltip>
      </Button>
    );
  }

  return (
    <Button
      theme="clear"
      sizeT="small"
      className={cx(s.root, className)}
    >
      <TokenLogo
        logo={{ name: metadata.name, thumbnailUri: token.thumbnailUri }}
        className={s.logo}
      />
      <span className={s.name}>
        {metadata.name}
      </span>
    </Button>
  );
};

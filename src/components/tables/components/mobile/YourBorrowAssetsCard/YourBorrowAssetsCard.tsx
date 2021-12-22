import React from 'react';
import BigNumber from 'bignumber.js';

import { withDropdown } from 'hocs/withDropdown';
import { WithDropdownInterface } from 'types/with-dropdown';
import { TokenMetadataInterface } from 'types/token';
import {
  convertUnits,
  getPrettyAmount,
  getPrettyPercent,
} from 'utils/helpers/amount';
import { getSliceTokenName } from 'utils/helpers/token';
import { TableCard } from 'components/ui/TableCard';
import { TokenName } from 'components/common/TokenName';

import s from '../Cards.module.sass';

type YourBorrowAssetsCardProps = {
  borrowLimit: number
  borrowApy: number
  wallet: number | BigNumber
  thumbnailUri?: string
  className?: string
} & TokenMetadataInterface;

const OrdinaryYourBorrowAssetsCard: React.FC<YourBorrowAssetsCardProps & WithDropdownInterface> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  decimals,
  borrowLimit,
  borrowApy,
  wallet,
  active,
  onClick,
  className,
}) => {
  const tokenMetadata = {
    id,
    address,
    name,
    symbol,
    thumbnailUri,
    decimals,
  };

  return (
    <TableCard
      active={active}
      onClick={onClick}
      theme="secondary"
      className={className}
    >
      <div className={s.row}>
        <div className={s.title}>
          Asset
        </div>
        <TokenName
          token={tokenMetadata}
          logoClassName={s.logo}
        />
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Borrow APY
        </div>
        <div className={s.value}>
          {getPrettyPercent(borrowApy)}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Balance
        </div>
        <div className={s.value}>
          {getPrettyAmount({
            value: convertUnits(wallet, tokenMetadata.decimals),
            currency: getSliceTokenName(tokenMetadata),
            dec: tokenMetadata.decimals,
          })}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Borrow limit
        </div>
        <div className={s.value}>
          {getPrettyAmount({
            value: convertUnits(borrowLimit, tokenMetadata.decimals),
            currency: getSliceTokenName(tokenMetadata),
            dec: tokenMetadata.decimals,
          })}
        </div>
      </div>
    </TableCard>
  );
};

export const YourBorrowAssetsCard = withDropdown(OrdinaryYourBorrowAssetsCard);

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

import s from './Cards.module.sass';

type BorrowAssetsCardProps = {
  liquidity: number | BigNumber
  borrowApy: number
  utilisationRate: number
  className?: string
} & TokenMetadataInterface;

const OrdinaryBorrowAssetsCard: React.FC<BorrowAssetsCardProps & WithDropdownInterface> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  decimals,
  liquidity,
  borrowApy,
  utilisationRate,
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
          Utilisation rate
        </div>
        <div className={s.value}>
          {getPrettyPercent(utilisationRate)}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Liquidity
        </div>
        <div className={s.value}>
          {getPrettyAmount({
            value: convertUnits(liquidity, tokenMetadata.decimals),
            currency: getSliceTokenName(tokenMetadata),
            dec: tokenMetadata.decimals,
          })}
        </div>
      </div>
    </TableCard>
  );
};

export const BorrowAssetsCard = withDropdown(OrdinaryBorrowAssetsCard);

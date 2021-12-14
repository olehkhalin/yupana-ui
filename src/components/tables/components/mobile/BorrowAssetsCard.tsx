import React from 'react';

import { withDropdown } from 'hocs/withDropdown';
import { WithDropdownInterface } from 'types/with-dropdown';
import { TokenMetadataInterface } from 'types/token';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getSliceTokenName } from 'utils/getSliceTokenName';
import { getPrettyPercent } from 'utils/getPrettyPercent';
import { TableCard } from 'components/ui/TableCard';
import { TokenName } from 'components/common/TokenName';

import s from './Cards.module.sass';

type BorrowAssetsCardProps = {
  liquidity: number
  borrowApy: number
  utilisationRate: number
  loading: boolean
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
  loading,
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
      loading={loading}
      className={className}
    >
      <div className={s.row}>
        <div className={s.title}>
          Asset
        </div>
        <TokenName
          token={tokenMetadata}
          loading={loading}
          theme="secondary"
          logoClassName={s.logo}
        />
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Borrow APY
        </div>
        <div className={s.value}>
          {loading
            ? borrowApy
            : getPrettyPercent(borrowApy)}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Utilisation rate
        </div>
        <div className={s.value}>
          {loading
            ? utilisationRate
            : getPrettyPercent(utilisationRate)}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Liquidity
        </div>
        <div className={s.value}>
          {loading
            ? liquidity
            : getPrettyAmount({
              value: liquidity,
              currency: getSliceTokenName(tokenMetadata),
              dec: tokenMetadata.decimals,
            })}
        </div>
      </div>
    </TableCard>
  );
};

export const BorrowAssetsCard = withDropdown(OrdinaryBorrowAssetsCard);

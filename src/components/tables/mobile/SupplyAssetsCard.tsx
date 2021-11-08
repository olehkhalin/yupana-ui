import React from 'react';

import { getSlice } from 'utils/getSlice';
import { getTokenName } from 'utils/getTokenName';
import { TableCard } from 'components/ui/TableCard';
import { TokenName } from 'components/common/TokenName';

import s from './Cards.module.sass';

type SupplyAssetsCardProps = {
  id?: string
  address: string
  name?: string
  symbol?: string
  collateralFactor: number
  supplyApy: number
  wallet: number
  thumbnailUri?: string
  className?: string
};

export const SupplyAssetsCard: React.FC<SupplyAssetsCardProps> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  collateralFactor,
  supplyApy,
  wallet,
  className,
}) => {
  const tokenMetadata = {
    id,
    address,
    name,
    symbol,
    thumbnailUri,
  };

  return (
    <TableCard
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
          {`${supplyApy.toFixed(2)}%`}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Collateral Factor
        </div>
        <div className={s.value}>
          {`${collateralFactor.toFixed(2)}%`}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Wallet
        </div>
        <div className={s.value}>
          {`${wallet} ${getSlice(getTokenName(tokenMetadata), 5)}`}
        </div>
      </div>
    </TableCard>
  );
};

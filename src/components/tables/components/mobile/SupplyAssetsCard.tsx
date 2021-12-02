import React from 'react';

import { withDropdown } from 'hocs/withDropdown';
import { WithDropdownInterface } from 'types/with-dropdown';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getSliceTokenName } from 'utils/getSliceTokenName';
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

const OrdinarySupplyAssetsCard: React.FC<SupplyAssetsCardProps & WithDropdownInterface> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  collateralFactor,
  supplyApy,
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
  };

  return (
    <TableCard
      active={active}
      onClick={onClick}
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
          Supply APY
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
          {getPrettyAmount({ value: wallet, currency: getSliceTokenName(tokenMetadata) })}
        </div>
      </div>
    </TableCard>
  );
};

export const SupplyAssetsCard = withDropdown(OrdinarySupplyAssetsCard);

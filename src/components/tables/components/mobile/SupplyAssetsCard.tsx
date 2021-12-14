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

type SupplyAssetsCardProps = {
  collateralFactor: number
  supplyApy: number
  wallet: number
  loading: boolean
  className?: string
} & TokenMetadataInterface;

const OrdinarySupplyAssetsCard: React.FC<SupplyAssetsCardProps & WithDropdownInterface> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  decimals,
  collateralFactor,
  supplyApy,
  wallet,
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
          theme="primary"
          logoClassName={s.logo}
        />
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Supply APY
        </div>
        <div className={s.value}>
          {loading
            ? supplyApy
            : getPrettyPercent(supplyApy)}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Collateral Factor
        </div>
        <div className={s.value}>
          {loading
            ? supplyApy
            : getPrettyPercent(collateralFactor)}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Wallet
        </div>
        <div className={s.value}>
          {loading
            ? wallet
            : getPrettyAmount({
              value: wallet,
              currency: getSliceTokenName(tokenMetadata),
              dec: tokenMetadata.decimals,
            })}
        </div>
      </div>
    </TableCard>
  );
};

export const SupplyAssetsCard = withDropdown(OrdinarySupplyAssetsCard);

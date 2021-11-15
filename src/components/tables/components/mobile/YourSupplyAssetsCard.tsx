import React from 'react';

import { withDropdown } from 'hocs/withDropdown';
import { WithDropdownInterface } from 'types/with-dropdown';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getSliceTokenName } from 'utils/getSliceTokenName';
import { TableCard } from 'components/ui/TableCard';
import { TokenName } from 'components/common/TokenName';
import { CollateralSwitcher } from 'components/common/CollateralSwitcher';

import s from './Cards.module.sass';

type YourSupplyAssetsCardProps = {
  id?: string
  address: string
  name?: string
  symbol?: string
  thumbnailUri?: string
  supplyApy: number
  balance: number
  className?: string
};

const OrdinaryYourSupplyAssetsCard: React.FC<YourSupplyAssetsCardProps & WithDropdownInterface> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  supplyApy,
  balance,
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
          Balance
        </div>
        <div className={s.value}>
          {getPrettyAmount({ value: balance, currency: getSliceTokenName(tokenMetadata) })}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Collateral
        </div>
        <CollateralSwitcher token={{ address }} />
      </div>
    </TableCard>
  );
};

export const YourSupplyAssetsCard = withDropdown(OrdinaryYourSupplyAssetsCard);

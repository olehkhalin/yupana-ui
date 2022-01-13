import React from 'react';
import BigNumber from 'bignumber.js';

import { STANDARD_PRECISION } from 'constants/default';
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

type SupplyAssetsCardProps = {
  collateralFactor: number
  supplyApy: number
  wallet: number | BigNumber
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
          {getPrettyPercent(supplyApy)}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Collateral Factor
        </div>
        <div className={s.value}>
          {getPrettyPercent(
            convertUnits(
              collateralFactor,
              STANDARD_PRECISION,
            ).multipliedBy(1e2),
          )}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Wallet
        </div>
        <div className={s.value}>
          {getPrettyAmount({
            value: convertUnits(wallet, tokenMetadata.decimals),
            currency: getSliceTokenName(tokenMetadata),
            dec: tokenMetadata.decimals,
          })}
        </div>
      </div>
    </TableCard>
  );
};

export const SupplyAssetsCard = withDropdown(OrdinarySupplyAssetsCard);

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
import { CollateralSwitcher } from 'components/common/CollateralSwitcher';

import s from '../Cards.module.sass';

type YourSupplyAssetsCardProps = {
  isCollateral: boolean
  yToken: number
  supplyApy: number
  loading: boolean
  wallet: number | BigNumber
  className?: string
} & TokenMetadataInterface;

const OrdinaryYourSupplyAssetsCard: React.FC<YourSupplyAssetsCardProps & WithDropdownInterface> = ({
  isCollateral,
  yToken,
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  decimals,
  supplyApy,
  loading,
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
      preloaderTheme="primary"
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
          Balance
        </div>
        <div className={s.value}>
          {loading
            ? wallet
            : getPrettyAmount({
              value: convertUnits(wallet, tokenMetadata.decimals),
              currency: getSliceTokenName(tokenMetadata),
              dec: tokenMetadata.decimals,
            })}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Collateral
        </div>
        {loading
          ? (
            <div className={s.value}>
              —
            </div>
          )
          : (
            <CollateralSwitcher
              isCollateral={isCollateral}
              yToken={yToken}
            />
          )}
      </div>
    </TableCard>
  );
};

export const YourSupplyAssetsCard = withDropdown(OrdinaryYourSupplyAssetsCard);

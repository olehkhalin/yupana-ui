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
import { BorrowTableDropdown } from 'components/common/TableDropdown';

import s from './Cards.module.sass';

type BorrowAssetsCardProps = {
  yToken: number
  borrowed: BigNumber
  liquidity: number | BigNumber
  borrowApy: number
  utilisationRate: number
  loading: boolean
  className?: string
} & TokenMetadataInterface;

const OrdinaryBorrowAssetsCard: React.FC<BorrowAssetsCardProps & WithDropdownInterface> = ({
  yToken,
  borrowed,
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
      preloaderTheme="secondary"
      loading={loading}
      className={className}
      TableDropdown={(
        <BorrowTableDropdown
          theme="secondary"
          yToken={yToken}
          asset={tokenMetadata}
          borrowed={borrowed}
        />
      )}
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

import React from 'react';

import { withDropdown } from 'hocs/withDropdown';
import { WithDropdownInterface } from 'types/with-dropdown';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getSliceTokenName } from 'utils/getSliceTokenName';
import { TableCard } from 'components/ui/TableCard';
import { TokenName } from 'components/common/TokenName';

import s from './Cards.module.sass';

type BorrowAssetsCardProps = {
  id?: string
  address: string
  name?: string
  symbol?: string
  liquidity: number
  borrowApy: number
  utilisationRate: number
  thumbnailUri?: string
  className?: string
};

const OrdinaryBorrowAssetsCard: React.FC<BorrowAssetsCardProps & WithDropdownInterface> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
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
          {`${borrowApy.toFixed(2)}%`}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Utilisation rate
        </div>
        <div className={s.value}>
          {`${utilisationRate.toFixed(2)}%`}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Liquidity
        </div>
        <div className={s.value}>
          {getPrettyAmount({ value: liquidity, currency: getSliceTokenName(tokenMetadata) })}
        </div>
      </div>
    </TableCard>
  );
};

export const BorrowAssetsCard = withDropdown(OrdinaryBorrowAssetsCard);

import React from 'react';

import { withDropdown } from 'hocs/withDropdown';
import { WithDropdownInterface } from 'types/with-dropdown';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getSliceTokenName } from 'utils/getSliceTokenName';
import { TableCard } from 'components/ui/TableCard';
import { TokenName } from 'components/common/TokenName';

import { getPrettyPercent } from 'utils/getPrettyPercent';
import s from '../Cards.module.sass';

type YourBorrowAssetsCardProps = {
  id?: string
  address: string
  name?: string
  symbol?: string
  borrowLimit: number
  borrowApy: number
  balance: number
  thumbnailUri?: string
  loading: boolean
  className?: string
};

const OrdinaryYourBorrowAssetsCard: React.FC<YourBorrowAssetsCardProps & WithDropdownInterface> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  borrowLimit,
  borrowApy,
  balance,
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
          Balance
        </div>
        <div className={s.value}>
          {loading
            ? balance
            : getPrettyAmount({ value: balance, currency: getSliceTokenName(tokenMetadata) })}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Borrow limit
        </div>
        <div className={s.value}>
          {loading
            ? borrowLimit
            : getPrettyPercent(borrowLimit)}
        </div>
      </div>
    </TableCard>
  );
};

export const YourBorrowAssetsCard = withDropdown(OrdinaryYourBorrowAssetsCard);

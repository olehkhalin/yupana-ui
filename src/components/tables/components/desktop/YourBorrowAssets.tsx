import React, { useMemo } from 'react';
import { Row } from 'react-table';
import BigNumber from 'bignumber.js';

import { TokenMetadataInterface } from 'types/token';
import { getSliceTokenName } from 'utils/helpers/token';
import {
  convertUnits,
  getPrettyAmount,
  getPrettyPercent,
} from 'utils/helpers/amount';
import { Table } from 'components/ui/Table';
import { SupplyTableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';

import s from './Tables.module.sass';

type YourBorrowAssetsProps = {
  data: any[]
  className?: string
};

export const YourBorrowAssets: React.FC<YourBorrowAssetsProps> = ({
  data,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'asset',
        Cell: ({ row }: { row: Row }) => (
          <TokenName
            token={{ ...row.values.asset }}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
      {
        Header: 'Borrow APY',
        id: 'borrowApy',
        accessor: ({ borrowApy }: { borrowApy: number }) => (
          getPrettyPercent(borrowApy)
        ),
      },
      {
        Header: 'Balance',
        id: 'balance',
        accessor: (
          { wallet, asset }: { wallet: number | BigNumber, asset: TokenMetadataInterface },
        ) => getPrettyAmount({
          value: convertUnits(wallet, asset.decimals),
          currency: getSliceTokenName(asset),
          dec: asset.decimals,
        }),
      },
      {
        Header: 'Borrow limit',
        id: 'borrowLimit',
        accessor: (
          { borrowLimit, asset }: { borrowLimit: number, asset: TokenMetadataInterface },
        ) => getPrettyAmount({
          value: convertUnits(borrowLimit, asset.decimals),
          currency: getSliceTokenName(asset),
          dec: asset.decimals,
        }),
      },
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
            theme="secondary"
            active={row.isExpanded}
            className={s.icon}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
    ],
    [],
  );

  const renderRowSubComponent = React.useCallback(
    () => (
      <SupplyTableDropdown theme="secondary" />
    ),
    [],
  );

  return (
    <Table
      theme="secondary"
      columns={columns}
      data={data}
      renderRowSubComponent={renderRowSubComponent}
      rowClassName={s.ownAssetsRow}
      className={className}
    />
  );
};

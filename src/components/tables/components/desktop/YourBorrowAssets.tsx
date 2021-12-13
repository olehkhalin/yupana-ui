import React, { useMemo } from 'react';
import { Row } from 'react-table';

import { TokenMetadataInterface } from 'types/token';
import { getSliceTokenName } from 'utils/getSliceTokenName';
import { Table } from 'components/ui/Table';
import { TableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';

import s from './Tables.module.sass';

type YourBorrowAssetsProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const YourBorrowAssets: React.FC<YourBorrowAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'asset',
        Cell: ({ row }: { row: Row }) => (
          <TokenName
            theme="secondary"
            loading={loading}
            token={{ ...row.values.asset }}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
      {
        Header: 'Borrow APY',
        id: 'borrowApy',
        accessor: ({ borrowApy }: { borrowApy: number | any }) => (
          borrowApy === '—'
            ? borrowApy
            : `${borrowApy.toFixed(2)}%`
        ),
      },
      {
        Header: 'Balance',
        id: 'balance',
        accessor: ({ balance, asset }:{ balance: number | any, asset: TokenMetadataInterface }) => (
          balance === '—'
            ? balance
            : `${balance.toFixed(2)} ${getSliceTokenName(asset)}`
        ),
      },
      {
        Header: 'Borrow limit',
        id: 'borrowLimit',
        accessor: ({ borrowLimit }: { borrowLimit: number | any }) => (
          borrowLimit === '—'
            ? borrowLimit
            : `${borrowLimit.toFixed(2)}%`
        ),
      },
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
            loading={loading}
            theme="secondary"
            active={row.isExpanded}
            className={s.icon}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
    ],
    [loading],
  );

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    () => (
      <TableDropdown theme="secondary" />
    ),
    [],
  );

  return (
    <Table
      theme="secondary"
      preloaderTheme="secondary"
      columns={columns}
      data={data}
      loading={loading}
      renderRowSubComponent={renderRowSubComponent}
      rowClassName={s.ownAssetsRow}
      className={className}
    />
  );
};
